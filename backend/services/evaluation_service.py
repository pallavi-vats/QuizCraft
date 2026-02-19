from models.attempt_model import Attempt


def evaluate_answers(db, answers):

    score = 0
    correct_ids = []
    wrong_ids = []

    for item in answers:
        question = db.query(Question).filter(
            Question.id == item.question_id
        ).first()

        if not question:
            continue

        if question.correct_answer == item.answer:
            score += 1
            correct_ids.append(question.id)
        else:
            wrong_ids.append(question.id)

    attempt = Attempt(score=score, total=len(answers))
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    return {
        "score": score,
        "total": len(answers),
        "correct": correct_ids,
        "wrong": wrong_ids
    }
