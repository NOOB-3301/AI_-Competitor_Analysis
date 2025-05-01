import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

type Result = {
    title: string;
    link: string;
};

type ResultWithConfidence = Result & {
    confidence: number; // A value between 0 and 1
};

// Init Gemini
const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY }) ;

export async function POST(req: Request) {
    const body = await req.json();
    const inputArray: Result[] = body.results;

    if (!inputArray || !Array.isArray(inputArray)) {
        return new Response(JSON.stringify({ error: "Invalid input format" }), { status: 400 });
    }

    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are an AI that evaluates news headlines and assigns a confidence score (0 to 1) based on how strongly each title implies collaboration between two companies.
Return a JSON array with the following structure:

[
  {
    "title": "original title here",
    "confidence": 0.85
  },
  ...
]

Here are the headlines:
${inputArray.map((r, i) => `${i + 1}. ${r.title}`).join("\n")}
`;

    try {
        // const result = await model.generateContent(prompt);
        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        })
        // const response = await result.response;
        console.log("Gemini response:", result); // Log the response for debugging
        const text = result.text;

        console.log("Gemini response:", text); // Log the response for debugging

        if ( text && text.trim() === "") {
            return new Response(JSON.stringify({ error: "Empty response from Gemini" }), { status: 500 });
            
        }
        // Try to parse the JSON-like response from Gemini
        const parsed: { title: string; confidence: number }[] = JSON.parse(
            text?.trim().match(/\[[\s\S]*\]/)?.[0] || "[]"
        );

        const enriched: ResultWithConfidence[] = inputArray.map((item) => {
            const found = parsed.find((r) => r.title === item.title);
            return {
                ...item,
                confidence: found?.confidence ?? 0.0, // default to 0 if not found
            };
        });

        return new Response(JSON.stringify({count: enriched.length, result:enriched}), { status: 200 });
    } catch (error) {
        console.error("Gemini error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate analysis" }), { status: 500 });
    }
}
