from pydantic import BaseModel
from typing import List, Optional


class QuestionCreate(BaseModel):
    topic: str
    type: str
    question: str
    options: Optional[List[str]] = None
    correct_answer: str


class QuestionResponse(BaseModel):
    id: int
    topic: str
    type: str
    question: str
    options: Optional[List[str]]

    class Config:
        orm_mode = True
