from pydantic import BaseModel


class PatientReportCreate(BaseModel):

    name: str
    age: int
    gender: str
    diagnosis: str
    confidence: str


class PatientReport(BaseModel):

    id: int
    name: str
    age: int
    gender: str
    diagnosis: str
    confidence: str

    class Config:
        from_attributes = True