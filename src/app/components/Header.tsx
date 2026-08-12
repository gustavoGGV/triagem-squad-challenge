import Image from "next/image";
import Link from "next/link";
import He4rtLogo from "@/app/assets/he4rt-logo.svg";

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

export default function Header() {
  return (
    <header className="relative z-30 px-6 py-2">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between rounded-[42px] border border-[#2d2d31] bg-[#121214] px-7 shadow-[0_8px_25px_rgba(0,0,0,0.16)]">
        <Link href="#inicio" className="flex items-center gap-3 text-[22px] font-bold tracking-tight text-[#f5f5f6]" aria-label="He4rt Devs, início">
          <Image src={He4rtLogo} alt="" className="h-9 w-9" priority />
          <span>He4rt Devs</span>
        </Link>

        <nav className="flex items-center gap-2.5" aria-label="Ações do usuário">
          <a href="#comunidade" aria-label="Links da comunidade" className="grid h-[46px] w-[46px] place-items-center rounded-xl border border-[#333338] text-[#f6f6f7] transition hover:bg-[#202024]">
            <LinkIcon />
          </a>
          <a href="#squads" aria-label="Projetos" className="grid h-[46px] w-[46px] place-items-center rounded-xl border border-[#333338] text-[#f6f6f7] transition hover:bg-[#202024]">
            <BagIcon />
          </a>
          <Link href="#comunidade" className="hidden h-[46px] items-center rounded-xl border border-[#333338] px-5 text-base font-medium text-[#f6f6f7] transition hover:bg-[#202024] sm:flex">
            Área do Usuário
          </Link>
          <a href="#comunidade" className="flex h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#7d26da] to-[#a22ed9] px-5 text-base font-bold text-white shadow-[0_5px_16px_rgba(121,38,211,0.22)] transition hover:brightness-110">
            <DiscordIcon />
            <span className="hidden sm:inline">Discord</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
