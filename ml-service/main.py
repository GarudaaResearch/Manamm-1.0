from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from utils.nlp import MultilingualPreprocessor
import uvicorn

app = FastAPI(title="E-Manam ML Service")
preprocessor = MultilingualPreprocessor()

# Load models (e.g., multilingual BERT for sentiment)
# In production, we'd cache these or use a model-serving platform
sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

class AnalysisRequest(BaseModel):
    text: str
    lang: str = "en"

@app.get("/")
async def root():
    return {"message": "E-Manam ML Service (FastAPI) is active"}

@app.post("/analyze/sentiment")
async def analyze_sentiment(request: AnalysisRequest):
    try:
        cleaned_text = preprocessor.full_pipeline(request.text, request.lang)
        result = sentiment_pipeline(cleaned_text)
        
        # Mapping 1-5 star BERT rating to Pos/Neg/Neu
        score_map = {
            "1 star": "Negative",
            "2 stars": "Negative",
            "3 stars": "Neutral",
            "4 stars": "Positive",
            "5 stars": "Positive"
        }
        
        label = result[0]['label']
        return {
            "text": request.text,
            "cleaned_text": cleaned_text,
            "sentiment": score_map.get(label, "Unknown"),
            "confidence": result[0]['score'],
            "original_label": label
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/emotion")
async def analyze_emotion(request: AnalysisRequest):
    # Dummy emotion detection for now (can be replaced with j-hartmann/emotion-english-distilroberta-base)
    emotions = ["Joy", "Anger", "Sadness", "Surprise", "Fear"]
    import random
    return {
        "text": request.text,
        "emotion": random.choice(emotions),
        "confidence": 0.85
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
