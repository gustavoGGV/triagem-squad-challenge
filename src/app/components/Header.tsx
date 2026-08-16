"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import He4rtLogo from "@/app/assets/he4rt-logo.svg";
import He4rtLogoPurple from "@/app/assets/he4rt-logo-purple.svg";

type HeaderProps = {
  dark?: boolean;
  onToggleTheme?: () => void;
};

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="m10.6 13.4 2.8-2.8M7.9 15.9l-1.1 1.1a3.5 3.5 0 0 1-5-5l3.3-3.3a3.5 3.5 0 0 1 5 0M16.1 8.1l1.1-1.1a3.5 3.5 0 0 1 5 5l-3.3 3.3a3.5 3.5 0 0 1-5 0" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M5 8.5h14l-.8 11H5.8L5 8.5ZM9 9V6a3 3 0 0 1 6 0v3M9 13.5h.01M15 13.5h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M19.54 4.43A17.2 17.2 0 0 0 15.3 3.1l-.52 1.05a15.66 15.66 0 0 0-5.56 0L8.7 3.1a17.26 17.26 0 0 0-4.25 1.34C1.77 8.37 1.05 12.2 1.4 15.98a17.1 17.1 0 0 0 5.2 2.64l1.26-1.7a9.86 9.86 0 0 1-1.98-.96l.47-.36c3.8 1.78 7.91 1.78 11.67 0l.47.36c-.64.38-1.3.7-1.98.96l1.26 1.7a17.02 17.02 0 0 0 5.2-2.64c.42-4.38-.72-8.18-3.42-11.55ZM8.61 13.66c-1.14 0-2.07-1.04-2.07-2.33S7.46 9 8.61 9s2.08 1.05 2.07 2.33c0 1.29-.93 2.33-2.07 2.33Zm6.78 0c-1.15 0-2.08-1.04-2.08-2.33S14.24 9 15.39 9s2.08 1.05 2.07 2.33c0 1.29-.92 2.33-2.07 2.33Z" />
    </svg>
  );
}

export default function Header({ dark = true, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const controlClass = dark ? "border-[#333338] text-[#f6f6f7] hover:bg-[#202024]" : "border-[#e7e3f0] text-[#554b70] hover:bg-[#f4f1fa]";

  return (
    <header className="relative z-30 px-3 py-2 sm:px-6">
      <div className={`relative mx-auto flex h-16 max-w-[1120px] items-center justify-between rounded-[32px] border px-4 shadow-[0_8px_25px_rgba(0,0,0,0.12)] sm:px-6 ${dark ? "border-[#2d2d31] bg-[#121214]" : "border-white/70 bg-white/85"}`}>
        <Link href="#inicio" className={`flex min-w-0 items-center gap-2.5 text-xl font-bold tracking-tight ${dark ? "text-[#f5f5f6]" : "text-[#211b3d]"}`} aria-label="He4rt Devs, início">
          <Image src={dark ? He4rtLogo : He4rtLogoPurple} alt="" className="h-8 w-8 shrink-0" priority />
          <span>He4rt Devs</span>
        </Link>

        <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} className={`grid h-12 w-12 place-items-center rounded-full border text-2xl transition lg:hidden ${controlClass}`}>
          <span aria-hidden>{menuOpen ? "×" : "☰"}</span>
        </button>
        <nav className="hidden items-center gap-2.5 lg:flex" aria-label="Ações do usuário">
          <button type="button" onClick={onToggleTheme} aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"} className={`grid h-[46px] w-[46px] place-items-center rounded-xl border transition ${controlClass}`}>
            {dark ? "☀" : "◐"}
          </button>
          <a href="https://heartdevs.com/redes" aria-label="Links da comunidade" className={`grid h-[46px] w-[46px] place-items-center rounded-xl border transition ${controlClass}`}>
            <LinkIcon />
          </a>
          <a href="https://loja.heartdevs.com/he4rt/" target="_blank" rel="noreferrer" aria-label="Loja" className={`grid h-[46px] w-[46px] place-items-center rounded-xl border transition ${controlClass}`}>
            <BagIcon />
          </a>
          <a href="https://heartdevs.com/app" className={`flex h-[46px] items-center rounded-xl border px-5 text-base font-medium transition ${controlClass}`}>
            Área do Usuário
          </a>
          <a href="https://discord.com/invite/he4rt" className="flex h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#7d26da] to-[#a22ed9] px-5 text-base font-bold text-white shadow-[0_5px_16px_rgba(121,38,211,0.22)] transition hover:brightness-110">
            <DiscordIcon />
            <span className="hidden sm:inline">Discord</span>
          </a>
        </nav>
      </div>
      {menuOpen && <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="menu-title">
        <button type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        <nav className={`absolute bottom-0 right-0 top-0 flex w-full max-w-[min(92vw,560px)] flex-col overflow-y-auto rounded-l-[42px] border-l p-7 pb-10 shadow-2xl animate-[drawer-in_250ms_ease-out] sm:rounded-l-[56px] sm:p-12 ${dark ? "border-[#2d2d31] bg-[#121214] text-white" : "border-[#e7e3f0] bg-[#fcfbff] text-[#211b3d]"}`} aria-label="Menu do usuário">
          <div className="flex items-center justify-between border-b border-current/15 pb-7">
            <h2 id="menu-title" className="text-3xl font-bold">Menu</h2>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" className={`grid h-14 w-14 place-items-center rounded-full border text-4xl font-light transition ${controlClass}`}>×</button>
          </div>
          <div className="mt-12 grid gap-4">
            <a href="https://heartdevs.com/redes" onClick={() => setMenuOpen(false)} className={`flex min-h-24 items-center justify-center gap-4 rounded-2xl border px-5 text-center text-2xl font-medium transition ${controlClass}`}><LinkIcon /> Redes sociais</a>
            <a href="https://loja.heartdevs.com/he4rt/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className={`flex min-h-24 items-center justify-center gap-4 rounded-2xl border px-5 text-center text-2xl font-medium transition ${controlClass}`}><BagIcon /> Compre na Loja</a>
            <a href="https://heartdevs.com/app" onClick={() => setMenuOpen(false)} className={`flex min-h-24 items-center justify-center rounded-2xl border px-5 text-center text-2xl font-medium transition ${controlClass}`}>Área do Usuário</a>
            <button type="button" onClick={() => { onToggleTheme?.(); }} className={`min-h-16 rounded-2xl border px-5 text-left font-semibold transition ${controlClass}`}>{dark ? "☀ Ativar modo claro" : "◐ Ativar modo escuro"}</button>
            <a href="https://discord.com/invite/he4rt" onClick={() => setMenuOpen(false)} className="flex min-h-24 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 text-2xl font-bold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110"><DiscordIcon /> Entrar no Discord</a>
          </div>
        </nav>
      </div>}
    </header>
  );
}
