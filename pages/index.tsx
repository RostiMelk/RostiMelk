import { useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getAccessToken } from '../lib/spotify';
import { isWorkRelatedReferer } from '../lib/utils';
import portrait from '../public/portrait.jpg';
import avatar from '../public/avatar.png';
import { Document, Header, Card, SpotifyCard, AmbientBackground } from '../components';
import { RiLinkedinFill, RiMailFill, RiTwitterFill, RiGithubFill, RiInstagramLine } from 'react-icons/ri';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const isWorkRelated = isWorkRelatedReferer(ctx.req.headers.referer);
	const { access_token } = await getAccessToken();

	return {
		props: {
			isWorkRelated,
			spotifyToken: access_token || null,
		},
	};
};

interface HomeProps {
	isWorkRelated: boolean;
	spotifyToken: string;
}

const Home = ({ isWorkRelated, spotifyToken }: HomeProps) => {
	const [spotifyImage, setSpotifyImage] = useState<string | undefined>(undefined);

	return (
		<Document>
			<Header picture={portrait} avatar={avatar} pictureAlt="Portrait of Rostislav Melkumyan">
				<p>
					Hey! <b>I’m Rosti</b>.
					{isWorkRelated
						? ' I am a Growth engineer at Sanity.io. Been buildings things on the web for a minute now.'
						: ' I write code and make software go beep boop.'}
				</p>
			</Header>

			<Card icon={RiLinkedinFill} title="LinkedIn" href="https://linkedin.com/in/rostimelk" />
			<Card icon={RiMailFill} title="Email" href="mailto:hello@rosti.no" hide={!isWorkRelated} />
			<Card icon={RiGithubFill} title="GitHub" href="https://github.com/rostimelk" hide={!isWorkRelated} />
			<SpotifyCard
				accessToken={spotifyToken}
				hideExplicit={isWorkRelated}
				onChange={(data) => {
					if (isWorkRelated && data?.isExplicit) return;
					setSpotifyImage(data?.albumImage);
				}}
			/>
			<Card icon={RiInstagramLine} title="Instagram" href="https://instagr.am/rostimelk" hide={isWorkRelated} />
			<Card icon={RiTwitterFill} title="Twitter" href="https://twitter.com/rostimelk" />
			<Card icon={RiGithubFill} title="GitHub" href="https://github.com/rostimelk" hide={isWorkRelated} />

			<AmbientBackground imageUrl={spotifyImage} />
		</Document>
	);
};

export default Home;
