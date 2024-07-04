import { Footer, Hero } from '@/components/svgs';
import { SpotifySection } from '@/components/SpotifySection';
import { LinksSection } from '@/components/LinksSection';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className="flex min-h-screen container max-w-2xl py-24 gap-20 flex-col relative">
			<header className="flex">
				<Hero />
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
