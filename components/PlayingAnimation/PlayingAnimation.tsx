import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	height: 20px;
	margin-bottom: 5px;
	column-gap: 3px;

	div {
		height: 100%;
		background-color: var(--color-text);
		width: 3px;
		animation: scale 1.2s infinite;
		transform-origin: bottom;
		&:nth-child(2) {
			animation-delay: 0.1s;
		}
		&:nth-child(3) {
			animation-delay: 0.3s;
		}
	}

	@keyframes scale {
		0% {
			transform: scaleY(1);
		}
		50% {
			transform: scaleY(0.5);
		}
		100% {
			transform: scaleY(1);
		}
	}
`;

const PlayingAnimation = () => {
	return (
		<Wrapper>
			<div></div>
			<div></div>
			<div></div>
		</Wrapper>
	);
};

export default PlayingAnimation;
