from sqlalchemy import Column, Integer, String
from database import Base

# Patient table
class Patient(Base):

    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    diagnosis = Column(String)
    confidence = Column(String)