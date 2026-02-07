import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { messages, codeContext, styleProfile, styleSummary } = await request.json();

    // Get the latest user message
    const lastMessage = messages[messages.length - 1];

    // Build context-aware prompt with style personalization
    const systemPrompt = `You are CodeMentor AI, a personalized AI pair programmer that adapts to each developer's unique coding style.

CRITICAL: Your responses MUST match the user's coding preferences. This is what makes you different from generic AI assistants.

${styleProfile ? `\n## USER'S CODING STYLE PROFILE:\n${styleProfile}\n` : ""}

${styleSummary ? `\n## STYLE SUMMARY:\n${styleSummary}\n` : ""}

${codeContext ? `\n## CURRENT CODE:\n\`\`\`\n${codeContext.slice(0, 3000)}\n\`\`\`\n` : ""}

## YOUR INSTRUCTIONS:

1. **Match Their Style**: When suggesting code, use:
   - Their naming convention (camelCase, snake_case, PascalCase)
   - Their preferred quotes (single, double, backticks)
   - Their function style (arrow functions vs function keyword)
   - Their comment style
   - Their indentation (spaces or tabs)

2. **Be Specific**: Reference their actual code when relevant

3. **Explain WHY**: Show why suggestions fit their style

4. **Code Examples**: Always format code suggestions matching their style

5. **Be Concise**: Helpful but not verbose

## USER'S QUESTION:
${lastMessage.content}

${styleProfile ? "\nRemember: Adapt your response to THEIR style, not a generic style!" : "Note: No style profile yet. Provide general but helpful advice."}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to get response", details: error.message },
      { status: 500 }
    );
  }
}
