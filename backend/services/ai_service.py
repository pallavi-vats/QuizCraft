import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("API key not found in .env")

client = genai.Client(api_key=api_key)


def generate_questions(topic: str, count: int):

    prompt = f"""
    Generate {count} quiz questions about {topic}.
    Return ONLY JSON list:
    [
      {{
        "type":"mcq",
        "question":"...",
        "options":["A","B","C","D"],
        "correct_answer":"..."
      }}
    ]
    """

    response = client.models.generate_content(
       model="gemini-1.5-flash"
,
        contents=prompt
    )

    text = response.text

    return json.loads(text)
