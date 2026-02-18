from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from deps import get_db
from services.quiz_service import generate_quiz
from schemas.quiz_schema import QuizQuestion

router = APIRouter()

@router.get("/quiz", response_model=List[QuizQuestion])
def get_quiz(
    topic: str = Query(...),
    qtype: str = Query(...),
    limit: int = Query(5),
    db: Session = Depends(get_db)
):
    return generate_quiz(db, topic, qtype, limit)
