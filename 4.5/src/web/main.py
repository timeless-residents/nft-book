from flask import Flask, render_template, request, redirect, url_for, jsonify
import os

from diffusers import StableDiffusionPipeline
import torch
from PIL import Image, ImageStat
import uuid

import json

def save_metadata(title, description, image_path):
    metadata = {
        'title' : title,
        'description' : description,
        'image' : image_path
    }
    metadata_filename = os.path.splitext(image_path)[0] + '.json'
    with open(os.path.join(app.config['UPLOAD_FOLDER'], metadata_filename), 'w') as f:
        json.dump(metadata, f)

    return metadata_filename

def is_image_all_black(image):
    stat = ImageStat.Stat(image)
    return all(channel < 1 for channel in stat.mean)


app = Flask(__name__)

UPLOAD_FOLDER = "./static/uploads"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    revision="fp16",
    torch_dtype=torch.float32
)
pipe = pipe.to("cpu")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.form['prompt']
    images = pipe(prompt, height=64, width=64)["images"]

    if is_image_all_black(images[0]):
        return jsonify({
            "success": False,
            "error": "Generated image is all black. Please try again with a different prompt or retry."
        })
    else:
        uid = uuid.uuid4()
        filename = f"{uid}.png"
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
        resized_image = images[0].resize((640, 640), Image.Resampling.LANCZOS)
        resized_image.save(image_path)

        title = f"Generated Artwork {uid}"
        description = f"An artwork {uid} generated from the prompt: {prompt}"
        metadata_filename = save_metadata(title, description, filename)

        metadata_path = os.path.join(app.config['UPLOAD_FOLDER'], metadata_filename)
        with open(metadata_path, 'r') as f:
            metadata_content = f.read()

        return jsonify({
            "success": True,
            "image_url": url_for('static', filename='uploads/' + filename),
            "metadata": metadata_content,
            "metadata_uri": url_for('static', filename='uploads/' + metadata_filename) 
        })

if __name__ == '__main__':
    app.run(debug=True)
