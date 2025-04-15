import io
import numpy as np
from PIL import Image, ImageChops, ImageEnhance

def convert_to_ela_image(image, quality=90):
    """Convert an image to its Error Level Analysis (ELA) representation."""
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    temp_io = io.BytesIO()
    image.save(temp_io, 'JPEG', quality=quality)
    temp_io.seek(0)
    temp_image = Image.open(temp_io)
    
    ela_image = ImageChops.difference(image, temp_image)
    extrema = ela_image.getextrema()
    max_diff = sum([ex[1] for ex in extrema]) / 3
    max_diff = max_diff if max_diff != 0 else 1
    
    scale = 255.0 / max_diff
    ela_image = ImageEnhance.Brightness(ela_image).enhance(scale)
    
    return ela_image

def prepare_image_for_ela(image):
    """Prepare image for model input using ELA."""
    ela_img = convert_to_ela_image(image, 90)
    model_input = np.array(ela_img.resize((128,128))).astype('float32') / 255.0
    model_input = model_input.reshape(1, 128, 128, 3)
    return model_input, ela_img
