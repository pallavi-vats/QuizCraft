from pydantic import BaseModel
from typing import List, Optional

class QuizQuestion(BaseModel):
    id: int
    question: str
    options: list[str] | None

    model_config = {"from_attributes": True}

