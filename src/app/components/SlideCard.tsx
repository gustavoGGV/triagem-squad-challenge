import { useMemo } from "react";
import { people } from "@/app/utils/constants";

type SlideCardProps = {
  variant: "chat" | "people";
};

export default function SlideCard({ variant }: SlideCardProps) {
  const selectedPeople = useMemo(
    () => [...people].sort(() => Math.random() - 0.5).slice(0, 4),
    [],
  );

  if (variant === "people") {
    return (
      <div className="animate-[slide-card-in_350ms_ease-out]">
        <div className="flex items-center justify-between">
          <div>
            <span className="rounded-full bg-[#e5d9ff] px-3 py-1 text-xs font-bold text-[#54219d]">Comunidade</span>
            <h2 className="mt-3 text-lg font-bold text-white">Lista de espera</h2>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-lg text-[#dfccff]">✦</span>
        </div>
        <div className="mt-6 space-y-2.5">
          {selectedPeople.map((person) => (
            <div key={person.area} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3 transition hover:bg-white/[0.12]">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-white ${person.color}`}>{person.initials}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-white">{person.name}</p><p className="mt-0.5 text-xs text-violet-100/65">{person.area}</p></div>
              <span className="h-2.5 w-2.5 rounded-full bg-[#78e6ae] shadow-[0_0_9px_rgba(120,230,174,0.9)]" aria-label="Online" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-[slide-card-in_350ms_ease-out]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#e5d9ff] px-3 py-1 text-xs font-bold text-[#54219d]">#he4rt</span>
        <span className="text-sm text-violet-100/70">online agora</span>
      </div>
      <div className="mt-10 space-y-4">
        <div className="ml-auto w-4/5 rounded-2xl rounded-tr-sm bg-[#9d61ff] p-4 text-sm leading-6 text-white">Alguém para revisar meu projeto?</div>
        <div className="w-11/12 rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-6 text-[#4d3868]">Bora! Compartilha o repositório com a gente ✨</div>
        <div className="w-2/3 rounded-2xl rounded-tl-sm bg-white/15 p-4 text-sm text-white">A comunidade está aqui.</div>
      </div>
      <div className="mt-8 flex -space-x-3">
        {["AM", "JO", "LI", "CA"].map((person, index) => <span key={person} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4a1682] text-xs font-bold text-white ${index % 2 ? "bg-[#ef7dba]" : "bg-[#7851cf]"}`}>{person}</span>)}
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4a1682] bg-white text-xs font-bold text-[#5821a1]">+2k</span>
      </div>
    </div>
  );
}
