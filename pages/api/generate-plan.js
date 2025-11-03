import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user } = req.body;

    const prompt = `
      You are an expert fitness and nutrition coach.
      Based on this user, create a detailed personalized fitness plan in **clear sections**:
      1. Workout Plan
      2. Diet Plan
      3. AI Tips

      User Info:
      - Name: ${user.name}
      - Age: ${user.age}
      - Gender: ${user.gender}
      - Height: ${user.heightCm} cm
      - Weight: ${user.weightKg} kg
      - Goal: ${user.goal}
      - Level: ${user.level}
      - Workout Location: ${user.location}
      - Dietary Preference: ${user.dietPref}
      - Medical Notes: ${user.medical}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const text = completion.choices[0].message.content.trim();

    // More flexible section splitting using regex
    const workoutMatch = text.match(/(Workout Plan[\s\S]*?)(?=Diet Plan|#### 2|AI Tips|#### 3|$)/i);
    const dietMatch = text.match(/(Diet Plan[\s\S]*?)(?=AI Tips|#### 3|$)/i);
    const tipsMatch = text.match(/(AI Tips[\s\S]*)/i);

    const workout = workoutMatch ? workoutMatch[1].trim() : "No data available";
    const diet = dietMatch ? dietMatch[1].trim() : "No data available";
    const tips = tipsMatch ? tipsMatch[1].trim() : "No data available";

    res.status(200).json({
      user,
      workout,
      diet,
      tips,
    });
  } catch (error) {
    console.error("Error generating plan:", error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
}
