import { Envelope, Footer, Hero } from "@/components/svgs";
import { SpotifySection } from "@/components/SpotifySection";
import { LinksSection } from "@/components/LinksSection";
import { Suspense } from "react";
import { TicTacToeSection } from "@/components/TicTacToeSection";

export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <main className="container relative flex min-h-screen max-w-3xl flex-col gap-20 pb-20 pt-24">
      <header className="flex flex-col items-center justify-between gap-10 sm:flex-row">
        <Hero />
        <TicTacToeSection />
      </header>

      <Suspense>
        <SpotifySection />
      </Suspense>

      <LinksSection />

      <footer className="mt-auto flex flex-col-reverse justify-between gap-10 sm:flex-row sm:items-end">
        <Footer />
        <Envelope />
      </footer>
    </main>
  );
}
