const API_BASE = "http://127.0.0.1:8000/api/v1";

export interface GenerateResponse {
  project_id: string;
  message: string;
}

export const deckService = {
  async generateOutline(text: string): Promise<GenerateResponse> {
    const response = await fetch(`${API_BASE}/generate-outline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to generate outline");
    }

    return response.json();
  },
};