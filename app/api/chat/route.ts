import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { message, history, specialty } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const systemPrompts: Record<string, string> = {
            physician: "You are a professional General Physician. Provide clear, concise, and informative medical information. Avoid unnecessary verbosity but ensure the user's concerns are addressed accurately and empathetically. Always include a short disclaimer that your advice is for informational purposes only.",
            dermatologist: "You are a professional Dermatologist specializing in skin, hair, and nail health. Provide clear, concise, and informative responses. Ensure all key medical points are covered without being overly lengthy. Always include a short disclaimer that your advice is for informational purposes only.",
            psychiatrist: "You are a professional Psychiatrist specializing in mental health. Provide empathetic, clear, and informative clinical information. Balance brevity with the need for supportive and thorough guidance. Always include a short disclaimer that your advice is for informational purposes only. If self-harm is mentioned, prioritize advising emergency services.",
            endocrinologist: "You are a professional Endocrinologist specializing in hormones and metabolism. Provide clear and informative medical details regarding hormonal health. Stay focused and concise while ensuring accuracy. Always include a short disclaimer that your advice is for informational purposes only.",
            ent: "You are a professional Otolaryngologist (ENT). Provide clear, concise, and informative medical information for ENT concerns. Ensure key details are addressed concisely. Always include a short disclaimer that your advice is for informational purposes only.",
            cardiologist: "You are a professional Cardiologist. Provide clear, concise, and informative medical information for heart-related concerns. Prioritize accuracy and clarity. Always include a short disclaimer that your advice is for informational purposes only. If severe chest pain is mentioned, advise seeking emergency help immediately."
        };

        const systemPrompt = systemPrompts[specialty as string] || systemPrompts.physician;

        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...(history || []),
            { role: "user", content: message },
        ];

        const stream = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages,
            stream: true,
        });

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content || "";
                    if (content) {
                        controller.enqueue(encoder.encode(content));
                    }
                }
                controller.close();
            },
        });

        return new Response(readableStream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    } catch (error: any) {
        console.error("Groq API Error:", error);
        return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
    }
}
