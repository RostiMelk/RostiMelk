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
	const [spotifyData, setSpotifyData] = useState<SpotifyApi.CurrentlyPlayingResponse | null>(null);

	if (!accessToken) {
		return null;
	}

	useEffect(() => {
		fetchSpotifyData();
		const interval = setInterval(() => fetchSpotifyData(), 60000);
		return () => clearInterval(interval);
	}, []);

	const fetchSpotifyData = async () => {
		let data = null;
		const url = new URL('https://api.spotify.com/v1/me/player/currently-playing');
		url.searchParams.append('market', 'NO');

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
		} catch (err) {
			console.error(err);
		}

		setSpotifyData(data);
	};

	if (!spotifyData || spotifyData?.item?.explicit) return null;

	const { external_urls, album, name, artists } = (spotifyData.item as any) || {};

	return (
		<AnimationWrapper>
			<StyledCard icon={RiSpotifyFill} title="Currently listening to" href={external_urls.spotify}>
				<Wrapper>
					<Img src={album.images[1].url} alt={name} />
					<div>
						<TitleWrapper>
							<Title>{name}</Title>
							{spotifyData?.is_playing && <PlayingAnimation />}
						</TitleWrapper>
						<Artists>{artists.map((a: any) => a.name).join(', ')}</Artists>
					</div>
				</Wrapper>
			</StyledCard>
		</AnimationWrapper>
	);
};

export default SpotifyCard;
