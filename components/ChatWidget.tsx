"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Product = { id: number; name: string; price: number; image: string; description: string };
type Message = { id: string; role: "assistant" | "user"; text: string; products?: Product[] };

const greeting: Message = { id: "greeting", role: "assistant", text: "Hi, I'm Aura, your Fashion Assistant. How can I help you style your look today?" };

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", text }]);
    setInput(""); setTyping(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: data.response, products: data.products }]);
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: "I’m sorry, I couldn’t reach the fitting room just now. Please try again in a moment." }]);
    } finally { setTyping(false); }
  }

  return <div className="fixed bottom-6 right-6 z-50 font-sans">
    {open && <section className="mb-4 flex h-[min(620px,calc(100vh-7.5rem))] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl" aria-label="Aura Fashion Assistant">
      <header className="flex items-center justify-between bg-slate-950 px-5 py-4 text-white"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-amber-400 font-black text-slate-950">A</span><div><h2 className="text-sm font-bold">Aura Assistant</h2><p className="text-xs text-slate-300">Your personal stylist</p></div></div><button onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white" aria-label="Close chat"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header>
      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
        {messages.map((message) => <div key={message.id} className={`message-in flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-slate-950 text-white" : "rounded-bl-md bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"}`}><p>{message.text}</p>{message.products && <div className="mt-3 space-y-2">{message.products.map((product) => <article className="flex gap-3 rounded-xl bg-slate-100 p-2 text-slate-900" key={product.id}><img className="h-16 w-12 rounded-lg object-cover" src={product.image} alt={product.name}/><div className="min-w-0"><h3 className="truncate text-xs font-bold">{product.name}</h3><p className="mt-0.5 text-xs leading-4 text-slate-600">{product.description}</p><p className="mt-1 text-xs font-extrabold">${product.price}</p></div></article>)}</div>}</div></div>)}
        {typing && <div className="flex justify-start"><div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:120ms]"/><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:240ms]"/></div></div>}
        <div ref={endRef}/>
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-200 bg-white p-3"><label className="sr-only" htmlFor="aura-chat-input">Ask Aura</label><input id="aura-chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about styles or prices..." className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"/><button disabled={!input.trim() || typing} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-400 text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button></form>
    </section>}
    <button onClick={() => setOpen((value) => !value)} className="group grid h-14 w-14 place-items-center rounded-full bg-slate-950 text-white shadow-xl transition hover:scale-105 hover:bg-amber-400 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-4" aria-label={open ? "Close Aura assistant" : "Open Aura assistant"}>{open ? <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18"/></svg> : <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.6 9.6 0 0 1-4.1-1.2L3 20l1.4-4.1A8.3 8.3 0 1 1 21 11.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="3" strokeLinecap="round"/></svg>}</button>
  </div>;
}
