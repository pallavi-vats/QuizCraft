from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from deps import get_db
from schemas.submit_schema import SubmitRequest, ResultResponse
from services.evaluation_service import evaluate_answers

router = APIRouter()

@router.post("/submit", response_model=ResultResponse)
def submit_quiz(data: SubmitRequest, db: Session = Depends(get_db)):
    return evaluate_answers(db, data.answers)
