import torch
from torchvision import models, transforms
from PIL import Image
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "xray_model.pth")

model = models.resnet18()
model.fc = torch.nn.Linear(model.fc.in_features, 2)

try:
    model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
    model.eval()
except Exception as e:
    print("Model loading error:", e)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

classes = ["NORMAL", "PNEUMONIA"]


def analyze_xray(image_file):

    image = Image.open(image_file).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(image)
        probabilities = torch.softmax(output, dim=1)
        prediction = torch.argmax(probabilities, 1).item()
        confidence = probabilities[0][prediction].item()

    diagnosis = classes[prediction]

    return {
        "diagnosis": diagnosis,
        "confidence": f"{confidence*100:.2f}%",
        "recommendation": "Consult a radiologist for confirmation"
    }