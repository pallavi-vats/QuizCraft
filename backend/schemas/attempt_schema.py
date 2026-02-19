from pydantic import BaseModel
from datetime import datetime


class AttemptResponse(BaseModel):
    id: int
    score: int
    total: int
    created_at: datetime

    model_config = {"from_attributes": True}
