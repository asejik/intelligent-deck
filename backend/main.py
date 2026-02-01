from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import deck # Import the new router

# 1. Load Environment Variables
load_dotenv()

# 2. Initialize App
app = FastAPI(title="Intelligent Deck Architect API", version="1.0")

# 3. Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Register Routers
app.include_router(deck.router, prefix="/api/v1", tags=["Deck Operations"])

# 5. Health Check
@app.get("/")
async def health_check():
    return {"status": "online", "version": "1.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)