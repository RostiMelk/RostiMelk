import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styled from 'styled-components';

type HeaderProps = {
	children: React.ReactNode;
	picture?: StaticImageData;
	pictureAlt?: string;
};

const Wrapper = styled.header`
	display: flex;
	margin-bottom: 38px;
	align-items: center;
	column-gap: 20px;
`;

const Img = styled(Image)`
	width: 87px;
	height: 87px;
	border-radius: 50%;
	object-fit: cover;
`;

const Header = ({ children, picture, pictureAlt }: HeaderProps) => {
	return (
		<Wrapper>
			{picture && <Img src={picture} alt={pictureAlt} />}
			{children}
		</Wrapper>
	);
};

export default Header;
