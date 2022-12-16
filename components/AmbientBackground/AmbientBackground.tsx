import styled from 'styled-components';

interface AmbientBackgroundProps {
	imageUrl?: string;
}

const FloatingSpan = styled.span<{ imageUrl: string }>`
	z-index: -1;
	position: fixed;
	top: 48%;
	left: 50%;
	width: 90vw;
	max-width: 780px;
	border-radius: 5%;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	transition: background-image 0.7s ease-in-out;
	filter: blur(50px);
	transform: translate(-50%, -50%);
	aspect-ratio: 1;
	object-fit: contain;

	&::after {
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		background: var(--color-body);

		@media (prefers-color-scheme: dark) {
			opacity: 0.75;
		}
	}
`;

const AmbientBackground = ({ imageUrl }: AmbientBackgroundProps) => {
	if (!imageUrl) return null;
	return <FloatingSpan imageUrl={imageUrl} aria-hidden="true" />;
};

export default AmbientBackground;
