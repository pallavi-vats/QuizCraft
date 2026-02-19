from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from deps import get_db
from models.attempt_model import Attempt
from schemas.attempt_schema import AttemptResponse
from typing import List

router = APIRouter()


@router.get("/attempts", response_model=List[AttemptResponse])
def get_attempts(db: Session = Depends(get_db)):
    return db.query(Attempt).all()
