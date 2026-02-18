from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.question_schema import QuestionCreate, QuestionResponse
from services.question_service import create_question
from deps import get_db

router = APIRouter()

@router.post("/question", response_model=QuestionResponse)
def add_question(question: QuestionCreate, db: Session = Depends(get_db)):
    return create_question(db, question)
