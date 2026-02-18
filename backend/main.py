from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

from routes.question_routes import router as question_router
from routes.quiz_routes import router as quiz_router


app = FastAPI(
    title="QuizCraft API",
    description="Quiz generation and evaluation API",
    version="1.0.0"
)

# Register routers
app.include_router(question_router)
app.include_router(quiz_router)

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/")
def home():
    return {"message": "QuizCraft API running"}
