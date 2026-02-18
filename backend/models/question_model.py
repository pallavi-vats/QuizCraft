from sqlalchemy import Column, Integer, String, JSON
from database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String)
    type = Column(String)
    question = Column(String)
    options = Column(JSON)
    correct_answer = Column(String)
