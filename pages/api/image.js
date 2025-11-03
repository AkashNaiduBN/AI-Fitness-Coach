import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { prompt } = req.body;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    res.status(200).json({ url: result.data[0].url });
  } catch (err) {
    console.error("Image Generation Error:", err);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
