import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

type HeaderProps = {
	children: React.ReactNode;
	picture?: StaticImageData;
	pictureAlt?: string;
	avatar?: StaticImageData;
};

const Wrapper = styled.header`
	display: grid;
	grid-template-columns: 87px 1fr;
	align-items: center;
	margin-bottom: 38px;
	column-gap: 20px;
	color: var(--color-text);
`;

const ImageWrapper = styled.div<{ spin?: boolean }>`
	z-index: 0;
	border-radius: 50%;
	overflow: hidden;

	${({ spin }) =>
		spin &&
		`
		animation: spin 0.7s ease-out 1;
	`}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;

const Header = ({ children, picture, pictureAlt, avatar }: HeaderProps) => {
	const [clickCount, setClickCount] = useState(0);
	const [imgSrc, setImgSrc] = useState(picture);
	const [spinPicture, setSpinPicture] = useState(false);

	const handleChangeToAvatar = () => {
		if (!avatar || clickCount > 4) return;

		const logs = ['👨', '👨‍🦰', '👨‍🦱', '🙆‍♂️', '👶'];
		console.log(logs[clickCount]);
		setClickCount(clickCount + 1);
		if (clickCount === 4) {
			setImgSrc(avatar);
			setSpinPicture(true);
		}
	};

	return (
		<Wrapper>
			{imgSrc && (
				<ImageWrapper onClick={handleChangeToAvatar} spin={spinPicture}>
					<Image
						priority
						src={imgSrc}
						alt={pictureAlt}
						width={87}
						height={87}
						layout="responsive"
						placeholder="blur"
						quality={60}
					/>
				</ImageWrapper>
			)}
			{children && <div>{children}</div>}
		</Wrapper>
	);
};

export default Header;
