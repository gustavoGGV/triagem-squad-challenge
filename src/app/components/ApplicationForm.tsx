"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import Header from "@/app/components/Header";

const areas = ["Backend", "DevOps", "Frontend", "Data", "UI/UX", "QA", "Mobile", "Integrações", "Gamificação", "Conteúdo"];
const preferences = ["Código", "Design", "Conteúdo", "Organização", "Suporte"];
const availability = ["Menos de 2h", "2–5h", "5–10h", "Mais de 10h"];
const gitLevels = ["Nunca usei", "Básico", "Confortável", "Avançado"];
const technologies = ["JavaScript", "TypeScript", "React", "Node", "PHP / Laravel", "Python", "Go", "SQL", "Figma", "Docker"];
const stages = ["Encaixe", "Experiência", "Motivação", "Compromissos", "Revisão"];
const titles = ["Seu encaixe", "Sua experiência", "Sua motivação", "Seus compromissos", "Revise sua candidatura"];

type Errors = Record<string, string>;

function FieldError({ message }: { message?: string }) { return message ? <p className="mt-2 text-sm font-medium text-rose-500" role="alert">{message}</p> : null; }
function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 fill-none stroke-current stroke-[1.8]">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c.8-4 3.2-6 7.5-6s6.7 2 7.5 6" strokeLinecap="round" />
  </svg>;
}
function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-5 py-3">
    <dt className="text-[var(--muted)]">{label}</dt>
    <dd className="max-w-[65%] text-right font-bold text-[var(--ink)]">{value || "Não informado"}</dd>
  </div>;
}
function Toggle({ checked, onChange, label, description, required }: { checked: boolean; onChange: () => void; label: string; description: string; required?: boolean }) {
  return <button type="button" onClick={onChange} aria-pressed={checked} className="flex w-full items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--soft)] p-4 text-left transition hover:border-violet-400">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-lg text-violet-600">{checked ? "✓" : "○"}</span>
    <span className="flex-1">
      <strong className="block text-[var(--ink)]">{label}{required && <span className="text-pink-500"> *</span>}</strong>
      <span className="mt-1 block text-sm text-[var(--muted)]">{description}</span>
    </span>
    <span aria-hidden className={`h-7 w-12 rounded-full p-1 transition ${checked ? "bg-violet-600" : "bg-violet-200"}`}>
      <span className={`block h-5 w-5 rounded-full bg-white shadow transition ${checked ? "translate-x-5" : ""}`} />
    </span>
  </button>;
}

export default function ApplicationForm() {
  const [dark, setDark] = useState(true);
  const [current, setCurrent] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewVisited, setReviewVisited] = useState(false);
  const [name, setName] = useState("");
  const [discord, setDiscord] = useState("");
  const [area, setArea] = useState("");
  const [preferencesSelected, setPreferencesSelected] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [git, setGit] = useState("");
  const [techs, setTechs] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState("");
  const [motivation, setMotivation] = useState("");
  const [contribution, setContribution] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [promote, setPromote] = useState(false);
  const [challenge, setChallenge] = useState(false);
  const surfaceStyle = { "--surface": dark ? "#20182e" : "#ffffff", "--ink": dark ? "#f7f2ff" : "#211b3d", "--muted": dark ? "#bcb3cf" : "#786f91", "--line": dark ? "#42364e" : "#ebe8f3", "--soft": dark ? "#2a2038" : "#f7f5fb" } as CSSProperties;

  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (!firstError) return;

    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-field="${firstError}"]`)?.focus());
  }, [errors]);
  
  const toggleSelection = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (items: string[]) => void,
  ) => {
    const nextValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(nextValues);
  };

  const getOptionClassName = (selected: boolean) => {
    const baseClassName = "rounded-full border px-4 py-2 text-sm font-semibold transition";
    const selectedClassName = "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-500/25";
    const defaultClassName = "border-[var(--line)] text-[var(--muted)] hover:border-violet-400";

    return `${baseClassName} ${selected ? selectedClassName : defaultClassName}`;
  };

  const validateFit = (): Errors => {
    const next: Errors = {};

    if (!name.trim()) next.name = "Informe como quer ser chamado.";
    if (!discord.trim()) next.discord = "Informe seu usuário do Discord.";
    if (!area) next.area = "Escolha sua área principal.";
    if (!preferencesSelected.length) next.preferences = "Selecione ao menos uma preferência.";
    if (!time) next.time = "Informe seu tempo disponível.";

    return next;
  };

  const validateExperience = (): Errors => !git ? { git: "Conte sua experiência com Git / GitHub." } : {};
  const validateMotivation = (): Errors => motivation.trim().length < 10 ? { motivation: "Escreva pelo menos 10 caracteres." } : {};
  const validateCommitments = (): Errors => {
    const next: Errors = {};

    if (!deadline) next.deadline = "Confirme seu compromisso com projetos com prazo.";
    if (!challenge) next.challenge = "Confirme sua disponibilidade para um desafio simples.";

    return next;
  };

  const validationByStage = [validateFit, validateExperience, validateMotivation, validateCommitments];
  const valid = (index: number) => index === 4 ? reviewVisited : !Object.keys(validationByStage[index]?.() ?? {}).length;
  const validate = (index: number) => {
    const next = validationByStage[index]?.() ?? {};
    setErrors(next);
    return !Object.keys(next).length;
  };

  const next = () => {
    if (!validate(current) || current >= stages.length - 1) return;

    if (current === stages.length - 2) setReviewVisited(true);
    setCurrent((value) => value + 1);
  };

  const submit = () => setSubmitted(true);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (current === stages.length - 1) {
      submit();
      return;
    }

    next();
  };

  const reset = () => {
    setSubmitted(false);
    setCurrent(0);
    setReviewVisited(false);
    setErrors({});
    setName("");
    setDiscord("");
    setArea("");
    setPreferencesSelected([]);
    setTime("");
    setGit("");
    setTechs([]);
    setPortfolio("");
    setMotivation("");
    setContribution("");
    setDeadline(false);
    setPromote(false);
    setChallenge(false);
  };

  const slides = [
    <fieldset key="fit">
      <legend className="text-lg font-bold text-[var(--ink)]">Como você pretende contribuir?</legend>
      <p className="mt-1 text-sm text-[var(--muted)]">Conte pra gente onde você se sente mais à vontade.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="font-bold text-[var(--ink)]">Seu nome <span className="text-pink-500">*</span>
          <input data-field="name" aria-invalid={Boolean(errors.name)} value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--soft)] px-4 py-3 font-normal text-[var(--ink)] outline-none focus:border-violet-500" placeholder="Como quer ser chamado?" />
          <FieldError message={errors.name} />
        </label>
        <label className="font-bold text-[var(--ink)]">Usuário do Discord <span className="text-pink-500">*</span>
          <input data-field="discord" aria-invalid={Boolean(errors.discord)} value={discord} onChange={(e) => setDiscord(e.target.value)} className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--soft)] px-4 py-3 font-normal text-[var(--ink)] outline-none focus:border-violet-500" placeholder="@seuusuario" />
          <FieldError message={errors.discord} />
        </label>
      </div>
      <div className="mt-7">
        <p className="font-bold text-[var(--ink)]">Área principal <span className="text-pink-500">*</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">{areas.map((item) => <button key={item} type="button" onClick={() => setArea(item)} className={getOptionClassName(area === item)}>{item}</button>)}</div>
        <FieldError message={errors.area} />
      </div>
      <div className="mt-7">
        <p className="font-bold text-[var(--ink)]">Preferência de atuação <span className="text-pink-500">*</span>
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">Pode marcar mais de uma.</p>
        <div className="mt-3 flex flex-wrap gap-2">{preferences.map((item) => <button key={item} type="button" onClick={() => toggleSelection(item, preferencesSelected, setPreferencesSelected)} className={getOptionClassName(preferencesSelected.includes(item))}>{item}</button>)}</div>
        <FieldError message={errors.preferences} />
      </div>
      <div className="mt-7">
        <p className="font-bold text-[var(--ink)]">Tempo disponível por semana <span className="text-pink-500">*</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">{availability.map((item) => <button key={item} type="button" onClick={() => setTime(item)} className={getOptionClassName(time === item)}>{item}</button>)}</div>
        <FieldError message={errors.time} />
      </div>
    </fieldset>,
    <fieldset key="experience">
      <legend className="text-lg font-bold text-[var(--ink)]">Sem pressão — serve só pra te encaixar melhor.</legend>
      <div className="mt-7">
        <p className="font-bold text-[var(--ink)]">Experiência com Git / GitHub <span className="text-pink-500">*</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">{gitLevels.map((item) => <button key={item} type="button" onClick={() => setGit(item)} className={getOptionClassName(git === item)}>{item}</button>)}</div>
        <FieldError message={errors.git} />
      </div>
      <div className="mt-7">
        <p className="font-bold text-[var(--ink)]">Tecnologias que você conhece</p>
        <p className="mt-1 text-sm text-[var(--muted)]">Opcional.</p>
        <div className="mt-3 flex flex-wrap gap-2">{technologies.map((item) => <button key={item} type="button" onClick={() => toggleSelection(item, techs, setTechs)} className={getOptionClassName(techs.includes(item))}>{item}</button>)}</div>
      </div>
      <label className="mt-7 block font-bold text-[var(--ink)]">Portfólio ou GitHub <span className="block mt-1 text-sm font-normal text-[var(--muted)]">Opcional.</span>
        <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://" className="mt-3 w-full rounded-xl border border-[var(--line)] bg-[var(--soft)] px-4 py-3 font-normal text-[var(--ink)] outline-none focus:border-violet-500" />
      </label>
    </fieldset>,
    <fieldset key="motivation">
      <legend className="text-lg font-bold text-[var(--ink)]">É o que o capitão lê primeiro. Capricha.</legend>
      <label className="mt-7 block font-bold text-[var(--ink)]">Por que esse squad? <span className="text-pink-500">*</span>
        <span className="mt-1 block text-sm font-normal text-[var(--muted)]">Mínimo de 10 caracteres.</span>
        <textarea data-field="motivation" aria-invalid={Boolean(errors.motivation)} value={motivation} onChange={(e) => setMotivation(e.target.value)} className="mt-3 min-h-36 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--soft)] p-4 font-normal text-[var(--ink)] outline-none focus:border-violet-500" />
        <span className="mt-1 block text-right text-xs text-[var(--muted)]">{motivation.length} caracteres</span>
        <FieldError message={errors.motivation} />
      </label>
      <label className="mt-7 block font-bold text-[var(--ink)]">O que você pode contribuir?<span className="mt-1 block text-sm font-normal text-[var(--muted)]">Opcional.</span>
        <textarea value={contribution} onChange={(e) => setContribution(e.target.value)} className="mt-3 min-h-28 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--soft)] p-4 font-normal text-[var(--ink)] outline-none focus:border-violet-500" />
      </label>
    </fieldset>,
    <fieldset key="commitments">
      <legend className="text-lg font-bold text-[var(--ink)]">Sinais de postura que ajudam o capitão a decidir.</legend>
      <div className="mt-7 space-y-4">
        <Toggle checked={deadline} onChange={() => setDeadline((value) => !value)} required label="Topo participar de projetos com prazo" description="Projetos são tudo-ou-nada: o time entrega junto, dentro do prazo." />
        <FieldError message={errors.deadline} />
        <Toggle checked={promote} onChange={() => setPromote((value) => !value)} label="Topo ajudar a divulgar a comunidade" description="Compartilhar, convidar pessoas e mostrar os projetos." />
        <Toggle checked={challenge} onChange={() => setChallenge((value) => !value)} required label="Topo fazer um desafio simples, se pedirem" description="Um mini-desafio no Git pra mostrar postura — não é prova técnica." />
        <FieldError message={errors.challenge} />
      </div>
      <p className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-700">ⓘ Suas respostas vão junto da candidatura. Quem aprova a entrada é o capitão ou o sub-líder.</p>
    </fieldset>,
    <section key="review" aria-label="Revisão da candidatura">
      <p className="text-lg font-bold text-[var(--ink)]">Confira seus dados antes de enviar.</p>
      <p className="mt-1 text-sm text-[var(--muted)]">Você pode voltar a qualquer etapa para editar suas respostas.</p>
      <div className="mt-7 grid gap-4">
        <article className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-[var(--ink)]">Encaixe</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{name} · {discord}<br />{area} · {preferencesSelected.join(", ")} · {time}</p>
            </div>
            <button type="button" onClick={() => setCurrent(0)} className="shrink-0 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-bold text-violet-600">Editar</button>
          </div>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-[var(--ink)]">Experiência</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Git: {git}<br />Tecnologias: {techs.join(", ") || "Não informado"}<br />Portfólio: {portfolio || "Não informado"}</p>
            </div>
            <button type="button" onClick={() => setCurrent(1)} className="shrink-0 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-bold text-violet-600">Editar</button>
          </div>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-[var(--ink)]">Motivação</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--muted)]">{motivation}</p>
            </div>
            <button type="button" onClick={() => setCurrent(2)} className="shrink-0 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-bold text-violet-600">Editar</button>
          </div>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-[var(--ink)]">Compromissos</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Prazo: {deadline ? "Sim" : "Não"} · Divulgação: {promote ? "Sim" : "Não"} · Desafio: {challenge ? "Sim" : "Não"}</p>
            </div>
            <button type="button" onClick={() => setCurrent(3)} className="shrink-0 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-bold text-violet-600">Editar</button>
          </div>
        </article>
      </div>
    </section>,
  ];

  if (submitted) return <main className={dark ? "min-h-screen bg-[#100b1c]" : "min-h-screen bg-[#f1f0f8]"}>
    <div className={dark ? "min-h-screen bg-[radial-gradient(circle_at_82%_0%,rgba(143,76,255,0.35),transparent_28%),radial-gradient(circle_at_8%_55%,rgba(101,53,201,0.24),transparent_32%)]" : "min-h-screen bg-[radial-gradient(circle_at_82%_0%,rgba(182,146,255,0.38),transparent_28%),radial-gradient(circle_at_8%_55%,rgba(218,202,255,0.52),transparent_34%)]"} style={surfaceStyle}>
      <Header dark={dark} onToggleTheme={() => setDark((value) => !value)} />
      <section id="inicio" aria-labelledby="success-title" className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <div className="rounded-[32px] border border-white/60 bg-[var(--surface)] p-7 shadow-[0_16px_40px_rgba(47,29,91,0.1)] sm:p-10">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl text-emerald-600" aria-hidden="true">✓</div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-violet-500">Candidatura enviada</p>
          <h1 id="success-title" className="mt-2 text-3xl font-bold text-[var(--ink)]">Aí sim, {name}!</h1>
          <p className="mt-2 text-[var(--muted)]">Sua candidatura foi enviada. Confira todas as respostas e o próximo passo.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-[1fr_0.9fr]">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--soft)] p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-violet-600 text-white">
                  <UserIcon />
                </span>
                <div>
                  <strong className="block text-[var(--ink)]">{name}</strong>
                  <span className="text-sm text-[var(--muted)]">{discord}</span>
                </div>
              </div>
              <dl className="mt-5 divide-y divide-[var(--line)] border-t border-[var(--line)] text-sm">
                <SummaryRow label="Área" value={area} />
                <SummaryRow label="Atuação" value={preferencesSelected.join(", ")} />
                <SummaryRow label="Tempo disponível" value={time} />
                <SummaryRow label="Git / GitHub" value={git} />
                <SummaryRow label="Tecnologias" value={techs.join(", ")} />
                <SummaryRow label="Portfólio ou GitHub" value={portfolio} />
                <SummaryRow label="Motivação" value={motivation} />
                <SummaryRow label="Contribuição" value={contribution} />
                <SummaryRow label="Projetos com prazo" value={deadline ? "Sim" : "Não"} />
                <SummaryRow label="Divulgar a comunidade" value={promote ? "Sim" : "Não"} />
                <SummaryRow label="Desafio simples" value={challenge ? "Sim" : "Não"} />
              </dl>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-500">&lt;/&gt; O que vem agora</p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">Desafio no GitHub</h2>
              <p className="mt-2 text-[var(--muted)]">Clone o repositório do desafio, crie sua branch e envie um Pull Request.</p>
              <div className="mt-5 overflow-hidden rounded-xl bg-[#1e1e20] text-sm text-[#ece6d6]">
                <p className="border-b border-white/10 px-4 py-3 text-xs text-[#aaa69d]">próximo-passo</p>
                <pre className="overflow-x-auto p-4 font-mono leading-7">→ git clone he4rt/4noobs{"\n"}→ git checkout -b primeiro-pull-request</pre>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="https://github.com/He4rt" target="_blank" rel="noreferrer" className="flex-1 rounded-xl bg-violet-600 px-5 py-3 text-center font-bold text-white transition hover:bg-violet-700">Ir para o GitHub →</a>
                <button type="button" onClick={reset} className="rounded-xl bg-[var(--soft)] px-5 py-3 font-bold text-[var(--ink)] transition hover:brightness-95">↻ Preencher de novo</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>;

  return <main className={dark ? "min-h-screen bg-[#100b1c]" : "min-h-screen bg-[#f1f0f8]"}>
    <div className={dark ? "min-h-screen bg-[radial-gradient(circle_at_82%_0%,rgba(143,76,255,0.35),transparent_28%),radial-gradient(circle_at_8%_55%,rgba(101,53,201,0.24),transparent_32%)]" : "min-h-screen bg-[radial-gradient(circle_at_82%_0%,rgba(182,146,255,0.38),transparent_28%),radial-gradient(circle_at_8%_55%,rgba(218,202,255,0.52),transparent_34%)]"} style={surfaceStyle}>
      <Header dark={dark} onToggleTheme={() => setDark((value) => !value)} />
      <section id="inicio" className="mx-auto max-w-[1280px] px-5 pb-12 pt-12 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-500">Formulário de triagem</p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--ink)]">{titles[current]}</h1>
          <div className="mt-5 flex justify-center gap-2" aria-label="Progresso das etapas">{stages.map((stage, index) => <span key={stage} title={stage} className={`h-2.5 rounded-full transition-all duration-300 ${valid(index) ? "w-9 bg-violet-600 animate-[progress-pop_300ms_ease-out]" : "w-2.5 bg-violet-300"}`} />)}</div>
        </div>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/60 bg-[var(--surface)] p-6 shadow-[0_16px_40px_rgba(47,29,91,0.1)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-violet-500">Etapa {current + 1} de {stages.length}</p>
            <h2 className="mt-1 text-2xl font-bold text-[var(--ink)]">{stages[current]}</h2>
            <div key={current} className="mt-7 animate-[form-slide-in_250ms_ease-out]">{slides[current]}</div>
            <div className="mt-8 flex justify-between border-t border-[var(--line)] pt-5">
              <button type="button" disabled={current === 0} onClick={() => { setErrors({}); setCurrent((value) => value - 1); }} className="rounded-xl border border-[var(--line)] px-5 py-3 font-bold text-[var(--muted)] transition hover:border-violet-400 disabled:invisible">‹ Voltar</button>{current < stages.length - 1 ? <button type="submit" className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-violet-700">Continuar →</button> : <button type="submit" className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-violet-700">Enviar candidatura</button>}</div>
          </form>
          <aside className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-700 p-1 shadow-[0_16px_40px_rgba(91,43,185,0.35)]">
            <div className="absolute left-1/2 top-0 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-[var(--surface)]" />
            <div className="rounded-[28px] border border-white/25 bg-white/10 p-6 pt-10 text-white backdrop-blur-sm">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/15">
                <UserIcon />
              </span>
              <h3 className="mt-5 text-2xl font-bold">{name || "Seu nome"}</h3>
              <p className="text-sm text-violet-100">{discord || "@usuario-do-discord"}</p>
              <div className="mt-8 space-y-4 border-t border-white/25 pt-5 text-sm">
                <p className="flex justify-between gap-4">
                  <span className="text-violet-100">Área</span>
                  <strong>{area || "—"}</strong>
                </p>
                <p className="flex justify-between gap-4">
                  <span className="text-violet-100">Atuação</span>
                  <strong className="text-right">{preferencesSelected.join(", ") || "—"}</strong>
                </p>
                <p className="flex justify-between gap-4">
                  <span className="text-violet-100">Tempo</span>
                  <strong>{time || "—"}</strong>
                </p>
                <p className="flex justify-between gap-4">
                  <span className="text-violet-100">Git</span>
                  <strong>{git || "—"}</strong>
                </p>
              </div>
              <p className="mt-8 border-t border-white/25 pt-4 text-center text-xs text-violet-100">Atualiza conforme você responde.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  </main>;
}
