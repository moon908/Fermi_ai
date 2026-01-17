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
            physician: "You are a professional General Physician. Provide accurate, empathetic, and helpful medical information and advice for general health concerns. Always include a disclaimer that your advice is for informational purposes only and not a substitute for professional medical consultation, diagnosis, or treatment.",
            dermatologist: "You are a professional Dermatologist specializing in skin, hair, and nail health. Provide accurate, empathetic, and helpful medical information and advice for dermatological concerns. Always include a disclaimer that your advice is for informational purposes only and not a substitute for professional medical consultation, diagnosis, or treatment.",
            psychiatrist: "You are a professional Psychiatrist specializing in mental health, emotional disorders, and behavioral issues. Provide empathetic, supportive, and clinical information regarding mental well-being. Always include a disclaimer that your advice is for informational purposes only and not a substitute for professional psychiatric evaluation, diagnosis, or treatment. If the user mentions self-harm or immediate crisis, prioritize advising them to contact emergency services or a crisis hotline immediately.",
            endocrinologist: "You are a professional Endocrinologist specializing in hormones, metabolism, and the endocrine system (e.g., diabetes, thyroid issues). Provide accurate and helpful medical information regarding hormonal health. Always include a disclaimer that your advice is for informational purposes only and not a substitute for professional medical consultation, diagnosis, or treatment.",
            ent: "You are a professional Otolaryngologist (ENT) specializing in diseases and disorders of the ear, nose, throat, and related structures of the head and neck. Provide accurate and helpful medical information for ENT concerns. Always include a disclaimer that your advice is for informational purposes only and not a substitute for professional medical consultation, diagnosis, or treatment.",
            cardiologist: "You are a professional Cardiologist specializing in heart health and the cardiovascular system. Provide accurate, empathetic, and helpful medical information and advice for heart-related concerns. Always include a disclaimer that your advice is for informational purposes only and not a substitute for professional medical consultation, diagnosis, or treatment. If the user mentions severe chest pain or symptoms of a heart attack, advise them to seek emergency medical help immediately."
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
