"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";

type Product = {
  id: number;
  name: string;
  category: string;
  tag: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Sculpted Wool Coat", category: "Outerwear", tag: "New Season", price: 249, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85" },
  { id: 2, name: "Essential Zip Hoodie", category: "Modern Basics", tag: "Trending", price: 98, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85" },
  { id: 3, name: "Tailored Wide Trouser", category: "Studio Edit", tag: "New Season", price: 128, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85" },
  { id: 4, name: "Contour Leather Tote", category: "Accessories", tag: "Trending", price: 189, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85" },
  { id: 5, name: "Relaxed Oxford Shirt", category: "Elevated Staples", tag: "New Season", price: 84, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85" },
  { id: 6, name: "Minimal Runner", category: "Footwear", tag: "Trending", price: 142, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85" },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <main className="overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="text-2xl font-black tracking-[-0.12em] text-slate-950" aria-label="Aura home">AURA</a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-slate-950" href="#collection">Collections</a>
            <a className="transition hover:text-slate-950" href="#collection">Men</a>
            <a className="transition hover:text-slate-950" href="#collection">Women</a>
            <a className="text-rose-700 transition hover:text-rose-900" href="#collection">Sale</a>
          </nav>
          <button className="group flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white" aria-label={`Shopping bag, ${cartCount} item${cartCount === 1 ? "" : "s"}`}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
            Bag <span className="grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-xs text-slate-950 group-hover:bg-amber-300">{cartCount}</span>
          </button>
        </div>
      </header>

      <section id="top" className="relative isolate min-h-[650px] overflow-hidden bg-slate-950 text-white">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90" alt="Model wearing contemporary fashion" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/10" />
        <div className="mx-auto flex min-h-[650px] max-w-7xl items-end px-5 pb-20 sm:px-8 md:items-center md:pb-0">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Autumn / Winter 2026</p>
            <h1 className="text-5xl font-black leading-[0.94] tracking-[-0.07em] sm:text-7xl lg:text-8xl">Defined by<br />your momentum.</h1>
            <p className="mt-7 max-w-md text-base leading-7 text-slate-200 sm:text-lg">New silhouettes for a life in motion. Effortless essentials, designed with intention.</p>
            <a href="#collection" className="mt-9 inline-flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-slate-950">Explore collection <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Curated for now</p><h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">The latest arrivals.</h2></div>
          <button className="w-fit border-b-2 border-slate-950 pb-1 text-sm font-bold text-slate-950 transition hover:border-amber-500 hover:text-slate-600">Shop all pieces</button>
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-900 shadow-sm">{product.tag}</span>
                <button onClick={() => setCartCount((count) => count + 1)} className="absolute bottom-4 left-4 right-4 translate-y-16 rounded-full bg-slate-950 px-4 py-3 text-sm font-bold text-white opacity-0 shadow-lg transition duration-300 hover:bg-amber-400 hover:text-slate-950 focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">Add to bag</button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="font-bold text-slate-950">{product.name}</h3><p className="mt-1 text-sm text-slate-500">{product.category}</p></div><p className="font-bold text-slate-950">${product.price}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-amber-400 px-5 py-16 text-center sm:px-8"><p className="text-xs font-extrabold uppercase tracking-[0.23em] text-slate-800">Aura journal</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl">Wear less. Choose better. Feel like yourself.</h2></section>
      <footer className="bg-slate-950 px-5 py-12 text-slate-300 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row"><div><p className="text-2xl font-black tracking-[-0.12em] text-white">AURA</p><p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">Modern essentials for your everyday rhythm.</p></div><div className="flex gap-8 text-sm font-semibold"><a href="#" className="hover:text-white">Shipping & Returns</a><a href="#" className="hover:text-white">Contact</a><a href="#" className="hover:text-white">Instagram</a></div></div><div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-6 text-xs text-slate-500">© 2026 Aura. All rights reserved.</div></footer>
      <ChatWidget />
    </main>
  );
}
