from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# 1. Load Environment Variables
load_dotenv()

# 2. Initialize App
app = FastAPI(title="Intelligent Deck Architect API", version="1.0")

# 3. Configure CORS (Critical for Frontend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow Vite Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Health Check Endpoint
@app.get("/")
async def health_check():
    return {
        "status": "online",
        "service": "Intelligent Deck Architect Backend",
        "version": "1.0"
    }

if __name__ == "__main__":
    import uvicorn
    # Run on port 8000, reload on code changes
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)