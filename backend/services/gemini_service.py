import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Use the requested model
# Note: If 'gemini-2.5-flash' is not yet propagated in your region,
# we may need to fallback to 'gemini-2.0-flash-exp' or 'gemini-1.5-flash'.
MODEL_NAME = "gemini-2.5-flash"

def generate_deck_outline(source_text: str):
    """
    Analyzes text and returns a JSON structure for the presentation.
    """
    try:
        model = genai.GenerativeModel(MODEL_NAME)

        prompt = f"""
        You are an expert Presentation Architect.
        Your goal is to transform the provided raw text into a structured PowerPoint outline.

        RULES:
        1. Extract the core theme for the "deck_title".
        2. Break the content into 5-8 logical slides.
        3. For each slide, choose the best layout: 'title_slide', 'bullet_list', 'image_left', or 'image_right'.
        4. Keep bullet points concise (under 15 words).
        5. Generate brief "speaker_notes" to help the presenter.
        6. OUTPUT MUST BE VALID JSON ONLY. No markdown formatting.

        RAW TEXT:
        {source_text[:10000]}  # Limit context to avoid token errors

        JSON SCHEMA:
        {{
            "deck_title": "String",
            "slides": [
                {{
                    "title": "String",
                    "layout_type": "String",
                    "body_points": ["String", "String"],
                    "speaker_notes": "String"
                }}
            ]
        }}
        """

        # Generate content requiring JSON MIME type for safety if supported,
        # otherwise we parse text.
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )

        # Parse the JSON response
        return json.loads(response.text)

    except Exception as e:
        print(f"Gemini Error: {e}")
        # Fallback structure in case of AI failure
        return {
            "deck_title": "Error Generating Deck",
            "slides": []
        }