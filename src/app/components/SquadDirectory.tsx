"use client";

import { useState } from "react";
import { squadFilters, squads } from "@/app/utils/constants";

export default function SquadDirectory() {
  // TODO: arrumar hover no mobile
  const [activeFilter, setActiveFilter] = useState<(typeof squadFilters)[number]>("Todas");
  const visibleSquads = activeFilter === "Todas" ? squads : squads.filter((squad) => squad.area === activeFilter);

  return (
    <section id="squads" className="relative mx-auto mt-20 max-w-7xl px-6 pb-8 lg:px-8">
      <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none]">
        {squadFilters.map((filter) => (
          <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition ${activeFilter === filter ? "border-[#8D3FFF] bg-[#5904D6] text-white shadow-[0_0_20px_rgba(141,63,255,0.4)]" : "border-white/15 bg-white/[0.06] text-violet-100/75 hover:border-[#7427ED]/70 hover:bg-white/10"}`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {visibleSquads.map((squad) => (
          <article key={squad.name} className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.07] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#8D3FFF]/70 hover:bg-white/10">
            <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: squad.color }} />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl text-xl font-black tracking-tight text-white shadow-[0_0_26px_rgba(141,63,255,0.35)]" style={{ background: `linear-gradient(135deg, ${squad.color}, #5904D6)` }}>{squad.initials}</div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#cdb7ff]">{squad.area}</span>
                <h2 className="mt-1 text-xl font-bold text-white">{squad.name}</h2>
                <p className="mt-2 text-sm leading-6 text-violet-100/70">{squad.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-violet-100/80"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#8D3FFF] text-[10px] font-bold text-white">{squad.captainInitials}</span><span>Capitã: <strong className="font-semibold text-white">{squad.captain}</strong></span></div>
              </div>
              <div className="sm:self-end flex flex-col">
                <span className="text-end py-4 text-sm leading-6 text-violet-100/70">1 vaga</span>
                <button type="button" className="shrink-0 rounded-xl bg-gradient-to-r from-[#7d26da] to-[#a22ed9] px-5 py-3 text-sm font-bold text-white shadow-[0_5px_16px_rgba(121,38,211,0.3)] transition hover:brightness-110 ">Candidatar-se</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
