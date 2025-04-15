from fastapi import FastAPI, File, UploadFile, Response
import numpy as np
from PIL import Image
import io

# Import from newly created modules
from image_utils import prepare_image_for_ela
from model_utils import load_model, predict_image

app = FastAPI()

model_path = "./model/model.tflite"

@app.on_event("startup")
async def startup_event():
    load_model(model_path)

@app.post("/predict")
async def predict(file: UploadFile = File(...), response: Response = None):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    model_input, ela_image = prepare_image_for_ela(image)
    prediction = predict_image(model_input)
    predicted_class_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction))
    
    is_fake = predicted_class_index == 1  # Assuming index 1 is "Fake"
    buffered = io.BytesIO()
    ela_image.save(buffered, format="JPEG")
    buffered.seek(0)

    return Response(
        content=buffered.getvalue(), 
        media_type="image/jpeg",
        headers={
            "X-Is-Fake": str(is_fake),
            "X-Confidence": str(round(confidence * 100, 2))
        }
    )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)