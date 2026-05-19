import Groq from "groq-sdk";
import { conferenceData } from "@/lib/conference-data";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

function buildSystemPrompt(role: string) {
 return `
You are the official AI assistant for the Clean Energy Conference website.

Below is official conference information.

${conferenceData}

User role: ${role}

Your responsibilities:
- Answer conference questions accurately
- Guide attendees and sponsors
- Help users navigate conference services
- Escalate serious support issues to the support team

Rules:
- Never invent information
- If information is missing, say:
  "Please contact the support team for confirmation."
- Keep answers concise and professional
- Prioritize official conference information
`;
}

export async function POST(req: Request) {
  const { message, role } = await req.json();

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: buildSystemPrompt(role) },
      { role: "user", content: message },
    ],
    temperature: 0.4,
  });

  return Response.json({
    reply: response.choices[0].message.content,
  });
}