from fastapi import FastAPI, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from ai_model import analyze_xray
from database import SessionLocal, engine
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS (for frontend on Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "MEDIVISION backend running"}


@app.post("/analyze")
async def analyze(
    patient_name: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    result = analyze_xray(image.file)

    # Save patient to database
    patient = models.Patient(
        name=patient_name,
        age=age,
        gender=gender,
        diagnosis=result["diagnosis"],
        confidence=result["confidence"]
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return {
        "patient_name": patient_name,
        "age": age,
        "gender": gender,
        "diagnosis": result["diagnosis"],
        "confidence": result["confidence"],
        "recommendation": result["recommendation"]
    }


@app.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(models.Patient).all()
    return patients