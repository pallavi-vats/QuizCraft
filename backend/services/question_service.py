from sqlalchemy.orm import Session
from models.question_model import Question
from schemas.question_schema import QuestionCreate

def create_question(db: Session, question: QuestionCreate):
    new_question = Question(
        topic=question.topic,
        type=question.type,
        question=question.question,
        options=question.options,
        correct_answer=question.correct_answer
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return new_question
