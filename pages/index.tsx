import type { GetServerSideProps } from 'next';
import { getAccessToken } from '../lib/spotify';
import portrait from '../public/portrait.jpg';
import { Document, Header, Card, SpotifyCard } from '../components';
import { RiLinkedinFill, RiMailFill, RiTwitterFill, RiGithubFill, RiInstagramLine } from 'react-icons/ri';

export const getServerSideProps: GetServerSideProps = async () => {
	const { access_token } = await getAccessToken();

	return {
		props: {
			spotifyToken: access_token,
		},
	};
};

interface HomeProps {
	spotifyToken: string;
}

const Home = ({ spotifyToken }: HomeProps) => {
	return (
		<Document>
			<Header picture={portrait}>
				<p>
					Hey! <b>I’m Rosti</b>. I write code and make software go beep boop.
				</p>
			</Header>

			<Card icon={RiLinkedinFill} title="LinkedIn" href="https://linkedin.com/in/rostimelk" />
			<SpotifyCard accessToken={spotifyToken} />
			<Card icon={RiMailFill} title="Email" href="mailto:hello@rosti.no" />
			<Card icon={RiTwitterFill} title="Twitter" href="https://twitter.com/rostimelk" />
			<Card icon={RiGithubFill} title="GitHub" href="https://github.com/rostimelk" />
			<Card icon={RiInstagramLine} title="Instagram" href="https://instagram.com/rostimelk" />
		</Document>
	);
};

export default Home;
