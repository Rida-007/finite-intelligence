from PIL import Image

def remove_background(input_path, output_path, threshold=50):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # Check if the pixel is dark enough to be considered background
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            # Change all dark pixels to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_background("logo.jpeg", "logo.png", threshold=40)
