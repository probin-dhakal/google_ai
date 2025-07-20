// Gemini API configuration and helper functions
const apiKey = ""; // Leave empty as specified

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export const callGeminiAPI = async (prompt, imageBase64 = null) => {
  try {
    const requestBody = {
      contents: [{
        parts: []
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    // Add text prompt
    if (prompt) {
      requestBody.contents[0].parts.push({
        text: prompt
      });
    }

    // Add image if provided
    if (imageBase64) {
      requestBody.contents[0].parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      });
    }

    // Simulate API call with mock responses for development
    return simulateGeminiResponse(prompt, imageBase64);
    
    // Uncomment below for actual API calls when apiKey is provided
    /*
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    */
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

// Simulate Gemini responses for development
const simulateGeminiResponse = async (prompt, imageBase64) => {
  // Add realistic delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const lowerPrompt = prompt.toLowerCase();

  // Disease diagnosis responses
  if (imageBase64 || lowerPrompt.includes('disease') || lowerPrompt.includes('leaf') || lowerPrompt.includes('plant')) {
    const diseases = [
      "Septoria Leaf Spot detected. Apply Neem Oil spray every 7 days. Remove affected leaves and ensure proper drainage.",
      "Early Blight identified. Use Copper-based fungicide. Improve air circulation and avoid overhead watering.",
      "Powdery Mildew found. Apply Baking Soda solution (1 tsp per liter). Increase sunlight exposure.",
      "Bacterial Leaf Spot detected. Remove infected parts immediately. Apply Copper Hydroxide spray.",
      "Healthy plant detected! Continue current care routine. Monitor for any changes."
    ];
    return diseases[Math.floor(Math.random() * diseases.length)];
  }

  // Market price responses
  if (lowerPrompt.includes('price') || lowerPrompt.includes('market') || lowerPrompt.includes('sell')) {
    return `Current market analysis: Tomato prices are ₹45/kg (+7% from yesterday). Recommendation: Sell 45% today at ₹23-25/kg, 30% tomorrow at ₹22-25/kg. Store unripe ones due to predicted hailstorm. Need storage advice? Just ask!`;
  }

  // Government scheme responses
  if (lowerPrompt.includes('scheme') || lowerPrompt.includes('subsidy') || lowerPrompt.includes('government')) {
    return `Based on your profile, you're eligible for PM-KISAN (₹6000/year), Crop Insurance, and Seed Subsidy. For PM-KISAN: Visit nearest CSC with Aadhaar, bank details, and land documents. Application deadline: March 31st.`;
  }

  // Crop calendar responses
  if (lowerPrompt.includes('sow') || lowerPrompt.includes('plant') || lowerPrompt.includes('harvest') || lowerPrompt.includes('when')) {
    return `For your location, optimal sowing window for Wheat: Nov 15-30, Harvest: April. Rice: Sow Jun 1-15, Harvest: October. Brinjal: Sow year-round, best in Feb-Mar and Jun-Jul. Consider soil temperature and moisture levels.`;
  }

  // General farming advice
  return `I'm here to help with your farming needs! You can ask me about crop diseases, market prices, government schemes, sowing schedules, or any other agricultural questions. How can I assist you today?`;
};