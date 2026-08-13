"use client";

import { useEffect, useState } from "react";
import SlideCard from "@/app/components/SlideCard";
import SquadDirectory from "@/app/components/SquadDirectory";
import { slides } from "@/app/utils/constants";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const changeSlide = (direction: number) => setCurrent((value) => (value + direction + slides.length) % slides.length);

  useEffect(() => {
    const moveSlide = (direction: number) => setCurrent((value) => (value + direction + slides.length) % slides.length);
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInteractiveElement = target?.matches("input, textarea, select, button, a, [contenteditable='true']");

      if (isInteractiveElement) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveSlide(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveSlide(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />
      <div className="relative">
        <div className="relative mx-auto grid max-w-7xl justify-center items-center gap-12 px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="lg:block flex flex-col items-center">
          <p className="mb-5 text-center lg:text-start text-xs font-extrabold uppercase tracking-[0.2em] text-[#d9c8ff]">{slide.tag}</p>
          <h1 className="max-w-xl text-center lg:text-start text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">{slide.title}</h1>
          <p className="mt-6 text-center lg:text-start max-w-lg text-lg leading-8 text-violet-100/80">{slide.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4 lg:flex-row flex-col">
            <a href={slide.href} className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#4d149b] transition hover:-translate-y-0.5 hover:bg-[#f0eaff]">
              {slide.cta}
            </a>
            <div className="flex gap-2" aria-label="Selecionar slide">
              {slides.map((_, index) => <button key={index} type="button" onClick={() => setCurrent(index)} aria-label={`Ir para slide ${index + 1}`} aria-current={current === index ? "true" : undefined} className={`h-2 rounded-full transition-all ${current === index ? "w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "w-2 bg-white/35 hover:bg-white/70"}`} />)}
            </div>
          </div>
        </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rotate-6 rounded-[2rem] bg-[#a65cff]/30 blur-2xl" />
            <div className="relative min-h-[410px] rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-[#100021]/50 backdrop-blur-sm sm:p-8">
              <SlideCard key={slide.card} variant={slide.card} />
            </div>
          </div>
        </div>
        <div className="relative mx-auto mt-12 flex max-w-7xl items-center justify-between px-6 max-lg:-translate-y-150 lg:static lg:mt-0 lg:px-0">
        <button
          type="button"
          onClick={() => changeSlide(-1)}
          aria-label="Ver slide anterior"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#32105f]/60 text-white shadow-[0_0_24px_rgba(174,112,255,0.18)] backdrop-blur-md transition duration-300 hover:-translate-x-1 hover:border-[#d0b6ff]/70 hover:bg-[#8241dd] hover:shadow-[0_0_30px_rgba(174,112,255,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:absolute lg:left-5 lg:top-1/2 lg:h-14 lg:w-14 lg:-translate-y-1/2 xl:left-10"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:-translate-x-0.5"><path d="m14.5 5-7 7 7 7M8 12h9" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          type="button"
          onClick={() => changeSlide(1)}
          aria-label="Ver próximo slide"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#32105f]/60 text-white shadow-[0_0_24px_rgba(174,112,255,0.18)] backdrop-blur-md transition duration-300 hover:translate-x-1 hover:border-[#d0b6ff]/70 hover:bg-[#8241dd] hover:shadow-[0_0_30px_rgba(174,112,255,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:absolute lg:right-5 lg:top-1/2 lg:h-14 lg:w-14 lg:-translate-y-1/2 xl:right-10"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5"><path d="m9.5 5 7 7-7 7M16 12H7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        </div>
      </div>
      {current === 0 && <SquadDirectory />}
      {current === 1 && <section id="lista" className="scroll-mt-8" aria-label="Lista de espera" />}
    </section>
  );
}
