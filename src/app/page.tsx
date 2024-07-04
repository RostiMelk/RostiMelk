import { Envelope, Footer, Hero } from "@/components/svgs";
import { SpotifySection } from "@/components/SpotifySection";
import { LinksSection } from "@/components/LinksSection";
import { Suspense } from "react";
import { TicTacToeSection } from "@/components/TicTacToeSection";

export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <main className="container relative flex min-h-screen max-w-3xl flex-col gap-20 py-24">
      <header className="flex flex-col items-center justify-between gap-10 sm:flex-row">
        <Hero />
        <TicTacToeSection />
      </header>

      <Suspense>
        <SpotifySection />
      </Suspense>

      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <LinksSection />
        <Envelope />
      </div>

      <footer className="mt-auto flex">
        <Footer />
      </footer>
    </main>
  );
}
