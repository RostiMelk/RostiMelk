import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../Card/';
import { RiSpotifyFill } from 'react-icons/ri';
import { PlayingAnimation } from '../PlayingAnimation';

interface FormattedSpotifyData {
	albumImage: string;
	artists: string;
	isEpisode: boolean;
	isExplicit: boolean;
	isPlaying: boolean;
	spotifyUrl: string;
	trackName: string;
}

interface SpotifyCardProps {
	accessToken: string;
	hideExplicit?: boolean;
	onChange?: (data: FormattedSpotifyData | null) => void;
}

const AnimationWrapper = styled.div`
	max-height: 0;
	margin-bottom: 20px;
	border-radius: var(--card-radius);
	overflow: hidden;
	animation: slide-down 500ms cubic-bezier(0.45, 0.05, 0.55, 0.95) 20ms forwards;
	will-change: max-height;

	@keyframes slide-down {
		0% {
			max-height: 0;
		}
		100% {
			max-height: 380px;
		}
	}
`;

const StyledCard = styled(Card)`
	margin-bottom: 0;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 20px;
	margin-bottom: 10px;
`;

const Img = styled.img`
	width: 90px;
	height: 90px;
	border-radius: 11px;
	object-fit: cover;
`;

const TitleWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	column-gap: 8px;
`;

const Title = styled.h4`
	margin: 0;
`;

const Artists = styled.p`
	margin-block: 6px;
`;

const formatSpotifyData = (data: SpotifyApi.CurrentlyPlayingObject): FormattedSpotifyData | null => {
	if (!data.item) return null;
	let { currently_playing_type, item } = (data as any) || {};
	const isEpisode = currently_playing_type === 'episode';

	return {
		albumImage: isEpisode ? item.images[1].url : item.album.images[1].url,
		artists: isEpisode ? item.show.publisher : item.artists.map((artist: any) => artist.name).join(', '),
		isEpisode,
		isExplicit: item.explicit,
		isPlaying: data.is_playing,
		spotifyUrl: item.external_urls.spotify,
		trackName: item.name,
	};
};

const SpotifyCard = ({ accessToken, hideExplicit, onChange }: SpotifyCardProps) => {
	if (!accessToken) return null;

	const [spotifyData, setSpotifyData] = useState<FormattedSpotifyData | null>(null);

	useEffect(() => {
		fetchSpotifyData();
		const interval = setInterval(() => fetchSpotifyData(), 10000); // Refresh every 10 seconds
		return () => clearInterval(interval);
	}, []);

	const fetchSpotifyData = async (fetchEpisodes?: boolean) => {
		let data = null;
		const url = new URL('https://api.spotify.com/v1/me/player/currently-playing');

		url.searchParams.append('market', 'NO');
		if (fetchEpisodes) {
			url.searchParams.append('type', 'episode');
		}

		try {
			const res = await fetch(url.toString(), {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (res.ok && res.status === 200) {
				data = await res.json();
			}
			// If the user is listening to an episode, fetch the data again, but this time with type=episode
			if (data?.currently_playing_type === 'episode' && !data.item) {
				fetchSpotifyData(true);
			}
		} catch (err) {
			console.error(err);
		}

		if (data) {
			const formattedData = formatSpotifyData(data);
			setSpotifyData(formattedData);
			onChange?.(formattedData);
		}
	};

	if (!spotifyData) return null;
	const { albumImage, artists, isExplicit, isPlaying, spotifyUrl, trackName } = spotifyData || {};

	if (isExplicit && hideExplicit) return null;

	return (
		<AnimationWrapper>
			<StyledCard icon={RiSpotifyFill} title="Currently listening to" href={spotifyUrl}>
				<Wrapper>
					<Img src={albumImage} alt={`Album art for: ${trackName}`} />
					<div>
						<TitleWrapper>
							<Title>{trackName}</Title>
							{isPlaying && <PlayingAnimation />}
						</TitleWrapper>
						<Artists>{artists}</Artists>
					</div>
				</Wrapper>
			</StyledCard>
		</AnimationWrapper>
	);
};

export default SpotifyCard;
