from sqlalchemy.orm import Session
from models.question_model import Question
import random

def generate_quiz(db: Session, topic: str, qtype: str, limit: int):

    questions = db.query(Question).filter(
        Question.topic == topic,
        Question.type == qtype
    ).all()

    if not questions:
        return []

    return random.sample(questions, min(limit, len(questions)))
