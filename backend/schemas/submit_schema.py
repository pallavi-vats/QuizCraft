from pydantic import BaseModel
from typing import List


class AnswerItem(BaseModel):
    question_id: int
    answer: str


class SubmitRequest(BaseModel):
    answers: List[AnswerItem]


class ResultResponse(BaseModel):
    score: int
    total: int
    correct: List[int]
    wrong: List[int]
