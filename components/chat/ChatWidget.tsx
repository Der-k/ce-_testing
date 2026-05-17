"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const role = "attendee"; // later you can detect dynamically

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, role }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

    setInput("");
  }

  return (
    <div className="fixed bottom-10 right-7 z-[999]">
      {/* Bubble */}
      {!open && (
        <button
  onClick={() => setOpen(true)}
  className="
    group
    relative
    flex
    items-center
    justify-center
    h-20
    w-20
    rounded-full
    border
    border-white/20
    bg-[#06056b]
    text-white
    shadow-[0_14px_55px_rgba(6,5,107,0.55)]
    backdrop-blur-xl
    transition-all
    duration-300
    hover:scale-110
    hover:shadow-[0_20px_70px_rgba(6,5,107,0.7)]
    active:scale-95
  "
>
  {/* Animated glow */}
  <div
    className="
      absolute
      inset-0
      rounded-full
      bg-[#06056b]
      opacity-40
      blur-xl
      transition-all
      duration-300
      group-hover:opacity-70
      group-hover:blur-3xl
    "
  />

  {/* Pulse ring */}
  <div
    className="
      absolute
      inset-0
      rounded-full
      border
      border-white/20
      animate-ping
      opacity-30
    "
  />

  {/* Icon */}
<MessageCircle
  size={34}
  className="relative z-10"
  strokeWidth={2.3}
/>

  {/* Online indicator */}
  <div
    className="
      absolute
      bottom-1
      right-1
      z-20
      h-4
      w-4
      rounded-full
      border-2
      border-white
      bg-emerald-400
    "
  />
</button>


      )}
<div
  className="
    absolute
    right-20
    top-1/2
    -translate-y-1/2
    whitespace-nowrap
    rounded-full
    border
    border-white/10
    bg-white/90
    px-4
    py-2
    text-sm
    font-medium
    text-[#06056b]
    shadow-xl
    backdrop-blur-md
  "
>
  Ask Conference AI
</div>
      {/* Chat Window */}
      {open && (
        <div className="w-80 h-[420px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-red-600 text-white">
            <span>Conference Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-gray-200 ml-auto"
                    : "bg-red-50"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-2 py-1 text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="bg-red-600 text-white px-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}