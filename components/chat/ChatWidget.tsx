"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (scrollContainerRef.current) {
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [messages]);
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
    <div className="fixed bottom-10 right-7 z-[99999] group">
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
h-16
w-16
sm:h-20
sm:w-20
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

  {/* Chat Window */}
{open && (
 <div
  className="
    fixed
    bottom-0
    right-0
    flex
    h-[100dvh]
    w-full
    flex-col
    overflow-hidden
    bg-white
    shadow-[0_35px_120px_rgba(6,5,107,0.38)]

    sm:bottom-6
    sm:right-6
    sm:h-[760px]
    sm:w-[560px]
    sm:rounded-[36px]
    sm:border
    sm:border-white/10
  "
>
    {/* Header */}
    <div
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#04045c]
        via-[#06056b]
        to-[#2954ff]
        px-5 py-5 sm:px-7 sm:py-6
        text-white
      "
    >
      {/* Ambient gradient */}
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/10 to-transparent" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-bold tracking-tight">
            Conference AI
          </h2>

          <p className="mt-1 text-[15px] text-white/75">
            Clean Energy Conference Assistant
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/10
            transition
            hover:bg-white/20
          "
        >
          <X size={20} />
        </button>
      </div>
    </div>

    {/* Scrollable Area */}
    <div
  ref={scrollContainerRef}
  className="
    flex-1
    overflow-y-auto
    bg-[#f5f7ff]
    scroll-smooth
  "
>
      {/* Welcome Card */}
      <div className="p-5">
        <div
          className="
            overflow-hidden
            rounded-[30px]
            bg-white
            shadow-sm
          "
        >
          {/* Hero Image */}
          <div className="relative h-40 sm:h-52 overflow-hidden">
            <img
              src="/hero.webp"
              alt="Conference"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 text-white">
              <div className="text-2xl font-bold">
                Clean Energy Conference
              </div>

              <div className="mt-1 text-sm text-white/80">
                Australia × Africa
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="p-6">
            <h3 className="text-[24px] font-bold text-[#06056b]">
              Welcome 👋
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-zinc-600">
              I can help you with sponsorships,
              registration, speakers, schedules,
              venue logistics and conference support.
            </p>

            {/* Smart Prompts */}
            <div className="mt-6">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Suggested Questions
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "How do I become a sponsor?",
                  "Where is the venue located?",
                  "Show the conference programme",
                  "How do I register?",
                  "Who are the keynote speakers?",
                  "How do I contact support?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="
                      rounded-2xl
                      border
                      border-[#06056b]/10
                      bg-[#f7f9ff]
                      px-4
                      py-4
                      text-left
                      text-sm
                      font-medium
                      text-[#06056b]
                      transition-all
                      duration-200
                      hover:border-[#06056b]/30
                      hover:bg-white
                      hover:shadow-md
                    "
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {messages.length > 0 && (
        <div className="space-y-4 px-5 pb-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-[26px] px-5 py-4 text-[15px] leading-7 shadow-sm ${
                  m.role === "user"
                    ? "bg-[#06056b] text-white"
                    : "bg-white text-zinc-700"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Bottom Input */}
    <div
      className="
        border-t
        border-[#06056b]/10
        bg-white
        p-5
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-[22px]
          border
          border-[#06056b]/10
          bg-[#f7f9ff]
          px-4
          py-3
        "
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the conference..."
          className="
            flex-1
            bg-transparent
            text-[15px]
            text-zinc-700
            outline-none
            placeholder:text-zinc-400
          "
        />

        <button
          onClick={sendMessage}
          className="
            rounded-2xl
            bg-[#06056b]
px-4
py-3
sm:px-6
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#0d0ca3]
            hover:shadow-lg
          "
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}