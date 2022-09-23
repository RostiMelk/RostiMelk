import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../Card/';
import { RiSpotifyFill } from 'react-icons/ri';
import { PlayingAnimation } from '../PlayingAnimation';

interface SpotifyCardProps {
	accessToken: string;
}

const AnimationWrapper = styled.div`
	max-height: 0;
	margin-bottom: 20px;
	border-radius: 20px;
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
	border-radius: 0;
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

const SpotifyCard = ({ accessToken }: SpotifyCardProps) => {
	if (!accessToken) return null;

	const [spotifyData, setSpotifyData] = useState<SpotifyApi.CurrentlyPlayingResponse | null>(null);

	useEffect(() => {
		fetchSpotifyData();
		const interval = setInterval(() => fetchSpotifyData(), 15000); // Refresh every 15 seconds
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
			setSpotifyData(data);
		}
	};

	if (!spotifyData?.item || spotifyData?.item?.explicit) return null;

	const { currently_playing_type, item, is_playing } = (spotifyData as any) || {};
	const isPodcast = currently_playing_type === 'episode';
	const spotifyUrl = item.external_urls.spotify;
	const imageUrl = isPodcast ? item.images[1].url : item.album.images[1].url;
	const artists = isPodcast ? item.show.publisher : item.artists.map((artist: any) => artist.name).join(', ');

	return (
		<AnimationWrapper>
			<StyledCard icon={RiSpotifyFill} title="Currently listening to" href={spotifyUrl}>
				<Wrapper>
					<Img src={imageUrl} alt={`Album art for: ${item.name}`} />
					<div>
						<TitleWrapper>
							<Title>{item.name}</Title>
							{is_playing && <PlayingAnimation />}
						</TitleWrapper>
						<Artists>{artists}</Artists>
					</div>
				</Wrapper>
			</StyledCard>
		</AnimationWrapper>
	);
};

export default SpotifyCard;
