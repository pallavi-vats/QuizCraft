from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from deps import get_db
from schemas.ai_schema import GenerateRequest
from schemas.question_schema import QuestionResponse
from services.ai_service import generate_questions
from models.question_model import Question
from typing import List
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/generate", response_model=List[QuestionResponse])
def generate_ai_questions(
    data: GenerateRequest,
    db: Session = Depends(get_db)
):

    questions = generate_questions(data.topic, data.count)

    if not questions:
        logger.error("AI returned empty response")
        raise HTTPException(status_code=500, detail="AI generation failed")

    saved = []

    try:
        for q in questions:
            obj = Question(
                topic=data.topic,
                type=q["type"],
                question=q["question"],
                options=q.get("options"),
                correct_answer=q["correct_answer"]
            )

            db.add(obj)
            saved.append(obj)

        db.commit()

        for obj in saved:
            db.refresh(obj)

        return saved

    except Exception as e:
        db.rollback()
        logger.exception("DB insert failed")
        raise HTTPException(status_code=500, detail="Database error")
