from sqlalchemy import Column, Integer, DateTime
from database import Base
import datetime


class Attempt(Base):
    __tablename__ = "attempts"

    id = Column(Integer, primary_key=True, index=True)
    score = Column(Integer)
    total = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
