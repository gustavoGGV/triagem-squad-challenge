import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    // TODO: seção de conteúdo tem linha cinza esquisita no topo; fazer footer
    <main className="min-h-screen bg-[#000000] bg-[radial-gradient(circle_at_82%_12%,rgba(174,112,255,0.42),transparent_20%),radial-gradient(circle_at_10%_52%,rgba(247,92,184,0.18),transparent_24%),radial-gradient(circle_at_75%_82%,rgba(103,57,210,0.28),transparent_26%)] text-white">
      <Header />
      <Hero />
    </main>
  );
}
