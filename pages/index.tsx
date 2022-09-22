import type { GetServerSideProps } from 'next';
import { getAccessToken } from '../lib/spotify';
import { isWorkRelatedReferer } from '../lib/utils';
import portrait from '../public/portrait.jpg';
import { Document, Header, Card, SpotifyCard } from '../components';
import { RiLinkedinFill, RiMailFill, RiTwitterFill, RiGithubFill, RiInstagramLine } from 'react-icons/ri';
import { SiVsco } from 'react-icons/si';

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
	return (
		<Document>
			<Header picture={portrait} pictureAlt="Portrait of Rostislav Melkumyan">
				<p>
					Hey! <b>I’m Rosti</b>. I write code and make software go beep boop.
				</p>
			</Header>

			<Card icon={RiLinkedinFill} title="LinkedIn" href="https://linkedin.com/in/rostimelk" />
			<SpotifyCard accessToken={spotifyToken} />
			<Card icon={RiMailFill} title="Email" href="mailto:hello@rosti.no" />
			<Card icon={RiTwitterFill} title="Twitter" href="https://twitter.com/rostimelk" />
			<Card icon={RiGithubFill} title="GitHub" href="https://github.com/rostimelk" />
			{!isWorkRelated && (
				<>
					<Card icon={RiInstagramLine} title="Instagram" href="https://instagram.com/rostimelk" />
					<Card icon={SiVsco} title="VSCO" href="https://vsco.co/rostimelk" />
				</>
			)}
		</Document>
	);
};

export default Home;
