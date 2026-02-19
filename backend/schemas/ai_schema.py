from pydantic import BaseModel, Field

class GenerateRequest(BaseModel):
    topic: str = Field(..., min_length=2, max_length=100)
    count: int = Field(..., ge=1, le=10)
