import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const verifyApiKeySchema = z.object({
    provider: z.string().trim().min(1),
    modelName: z.string().trim().min(1),
    apiKey: z.string().trim().min(8),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = verifyApiKeySchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid request payload.",
                    details: parsed.error.flatten(),
                },
                { status: 400 },
            );
        }

        const { provider, modelName, apiKey } = parsed.data;

        // Skip attempting to force Mastra for standard verification if it struggles with dynamic configuration,
        // we'll just use the underlying AI SDK directly to verify the API key which is much more reliable
        // for simple key checking.
        
        let model: any = null;
        
        try {
            if (provider.toLowerCase() === "google" || provider.toLowerCase() === "gemini") {
                const google = createGoogleGenerativeAI({ apiKey });
                model = google(modelName);
            } else if (provider.toLowerCase() === "openai") {
                const openai = createOpenAI({ apiKey });
                model = openai(modelName);
            } else if (provider.toLowerCase() === "anthropic") {
                const anthropic = createAnthropic({ apiKey });
                model = anthropic(modelName);
            } else {
                // If it's a provider we don't have a direct SDK for, attempt an OpenAI compatible fetch check if we can,
                // or just optimistically pass them if they are an obscure provider from models.dev
                return NextResponse.json({ success: true, warning: 'Provider not natively verifiable, assuming key is correct.' });
            }

            // Simple verification generation
            await generateText({
                model,
                prompt: "Reply with the word 'Hello'.",
                maxTokens: 5
            });

            return NextResponse.json({ success: true });
            
        } catch (genError: any) {
            console.error("AI Generation Error:", genError);
            let errorMessage = "Unable to verify API key.";
            if (genError?.message) errorMessage = genError.message;
            
            return NextResponse.json({
                success: false,
                error: errorMessage
            }, { status: 400 });
        }
    } catch (error: any) {
        console.error("API Key Verification Main Error:", error);
        return NextResponse.json(
             { success: false, error: "An unexpected error occurred during verification." },
             { status: 500 }
        );
    }
}
