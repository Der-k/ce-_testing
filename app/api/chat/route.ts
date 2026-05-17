import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

function buildSystemPrompt(role: string) {
  return `
You are the official AI assistant for a Clean Energy Conference website.

You help users with:
- event schedule
- ticketing
- venue information
- sponsorship information
- speaker information
- support contact escalation

User role: ${role}

Rules:
- If role is attendee → focus on tickets, schedule, venue
- If sponsor → focus on sponsorship packages, branding, booths
- If speaker → focus on sessions, timing, AV setup
- If unknown → give general info
- If question is unclear → ask clarifying question
- If it is a support issue → suggest contacting support team

Be concise, accurate, and professional.
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