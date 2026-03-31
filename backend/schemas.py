from pydantic import BaseModel


# -----------------------------
# Create Report (Request)
# -----------------------------

class PatientReportCreate(BaseModel):

    patient_name: str
    age: int
    gender: str
    diagnosis: str
    confidence: str


# -----------------------------
# Response Schema
# -----------------------------

class PatientReport(BaseModel):

    id: int
    patient_name: str
    age: int
    gender: str
    diagnosis: str
    confidence: str

    class Config:
        orm_mode = True