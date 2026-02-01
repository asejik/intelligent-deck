from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from services.gemini_service import generate_deck_outline
from services.supabase_service import supabase

router = APIRouter()

class GenerateRequest(BaseModel):
    text: str

@router.post("/generate-outline")
async def generate_outline(request: GenerateRequest):
    """
    1. Generates outline via Gemini.
    2. Saves Project and Slides to DB.
    3. Returns Project ID.
    """
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")

    # 1. AI Generation
    print("Calling Gemini Architect...")
    ai_data = generate_deck_outline(request.text)

    if not ai_data.get("slides"):
        raise HTTPException(status_code=500, detail="AI failed to generate outline")

    # 2. Create Project in DB
    print("Saving to Supabase...")
    project_response = supabase.table("projects").insert({
        "title": ai_data["deck_title"],
        "source_text": request.text[:5000], # Store first 5k chars for reference
        "status": "generating"
    }).execute()

    project_id = project_response.data[0]["id"]

    # 3. Prepare Slides Data
    slides_data = []
    for index, slide in enumerate(ai_data["slides"]):
        slides_data.append({
            "project_id": project_id,
            "sort_order": index + 1,
            "layout_type": slide.get("layout_type", "bullet_list"),
            "content": {
                "title": slide.get("title", "Untitled Slide"),
                "body_points": slide.get("body_points", [])
            },
            "speaker_notes": slide.get("speaker_notes", ""),
            "image_prompt": f"Minimalist abstract representation of {slide.get('title')}, professional, 4k"
        })

    # 4. Bulk Insert Slides
    supabase.table("slides").insert(slides_data).execute()

    return {"project_id": project_id, "message": "Outline created successfully"}