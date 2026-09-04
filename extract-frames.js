import ffmpeg from 'ffmpeg-static';
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoFile = path.join(__dirname, 'video5.mp4');
const outputDir = path.join(__dirname, 'public', 'frames5');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Using FFmpeg binary at: ${ffmpeg}`);
console.log(`Extracting frames from: ${videoFile}`);
console.log(`Output directory: ${outputDir}`);

// Extract at 30 fps, scale to maximum width of 1920 to keep file sizes manageable, output as JPG
// %04d means frame_0001.jpg, frame_0002.jpg, etc.
const args = [
  '-i', videoFile,
  '-vf', 'scale=1920:-1,fps=30', 
  '-qscale:v', '2', // High quality JPEG
  path.join(outputDir, 'frame_%04d.jpg')
];

const child = execFile(ffmpeg, args, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error extracting frames: ${error.message}`);
    return;
  }
  console.log('Frame extraction complete!');
});

child.stdout.on('data', (data) => console.log(data.toString()));
child.stderr.on('data', (data) => {
    // FFmpeg outputs to stderr, print it so we can see progress
    process.stdout.write('.');
});
