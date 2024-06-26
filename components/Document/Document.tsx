import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Footer } from '../';

type DocumentProps = {
	children: React.ReactNode;
};

const Document = ({ children }: DocumentProps) => {
	const [themeColor, setThemeColor] = useState('');

	useEffect(() => {
		const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-body');
		setThemeColor(themeColor);
	}, []);

	return (
		<>
			<Head>
				<link rel="icon" type="image/svg+xml" href="/favicons.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Rostislav Melkumyan - Growth engineer based in Oslo Norway</title>
				<meta name="description" content="Hey! I’m Rosti. I write code and make software go beep boop." />
				<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
				<link rel="manifest" href="/favicons/site.webmanifest" />
				<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color={themeColor} />
				<link rel="shortcut icon" href="/favicons/favicon.ico" />
				<meta name="msapplication-TileColor" content={themeColor} />
				<meta name="msapplication-config" content="/favicons/browserconfig.xml" />
				<meta property="og:image" content="/seo-image.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Rostislav Melkumyan - Growth engineer based in Oslo Norway" />
				<meta
					property="og:description"
					content="Hey! I’m Rosti. I write code and make software go beep boop."
				/>
				<meta property="og:url" content="https://rosti.no" />
				<meta name="twitter:image" content="/seo-image.jpg" />
				<meta name="twitter:card" content="Rostislav Melkumyan - Growth engineer based in Oslo Norway" />
				<meta name="twitter:title" content="Rostislav Melkumyan - Growth engineer based in Oslo Norway" />
				<meta
					name="twitter:description"
					content="Hey! I’m Rosti. I write code and make software go beep boop."
				/>
				<meta name="theme-color" content={themeColor} />
				<link rel="canonical" href="https://rosti.no/" />
				{/* Preconnect to Spotify API */}
				<link rel="preconnect" href="https://api.spotify.com" />
				{/* Preload fonts */}
				<link
					rel="preload"
					as="font"
					type="font/woff2"
					href="/fonts/noto-sans-v27-latin-regular.woff2"
					crossOrigin="true"
				/>
				<link
					rel="preload"
					as="font"
					type="font/woff2"
					href="/fonts/noto-sans-v27-latin-500.woff2"
					crossOrigin="true"
				/>
				<link
					rel="preload"
					as="font"
					type="font/woff2"
					href="/fonts/noto-sans-v27-latin-700.woff2"
					crossOrigin="true"
				/>
			</Head>
			<Container>{children}</Container>
			<Footer>
				<p>❤️ from Oslo, Norway</p>
			</Footer>{' '}
		</>
	);
};

export default Document;
