import { Footer, Hero } from '@/components/svgs';
import { SpotifySection } from '@/components/SpotifySection';
import { LinksSection } from '@/components/LinksSection';
import { Suspense } from 'react';
import { TicTacToeSection } from '@/components/TicTacToeSection';

export const fetchCache = 'force-no-store';

export default function Home() {
	return (
		<main className="flex min-h-screen container max-w-3xl py-24 gap-20 flex-col relative">
			<header className="flex flex-col sm:flex-row gap-10 justify-between items-center">
				<Hero />
				<TicTacToeSection />
			</header>

			<Suspense>
				<SpotifySection />
			</Suspense>

			<LinksSection />

			<footer className="flex mt-auto">
				<Footer />
			</footer>
		</main>
	);
}
