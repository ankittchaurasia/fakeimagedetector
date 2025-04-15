import numpy as np
from tflite_runtime.interpreter import Interpreter

# Global variable for model interpreter
interpreter = None

def load_model(model_path):
    """Load TFLite model and allocate tensors."""
    global interpreter
    interpreter = Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    
def predict_image(input_data):
    """Use the model to predict on input data."""
    global interpreter
    
    if interpreter is None:
        raise ValueError("Model not loaded. Call load_model first.")
        
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()

    output_data = interpreter.get_tensor(output_details[0]['index'])
    return output_data[0]  # Returns an array like [0.01, 0.99]
