import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styled from 'styled-components';

type HeaderProps = {
	children: React.ReactNode;
	picture?: StaticImageData;
	pictureAlt?: string;
};

const Wrapper = styled.header`
	display: grid;
	grid-template-columns: 87px 1fr;
	align-items: center;
	margin-bottom: 38px;
	column-gap: 20px;
	color: var(--color-text);
`;

const Img = styled(Image)`
	border-radius: 50%;
`;

const Header = ({ children, picture, pictureAlt }: HeaderProps) => {
	return (
		<Wrapper>
			{picture && <Img src={picture} alt={pictureAlt} width={87} height={87} quality={60} layout="responsive" />}
			{children && <div>{children}</div>}
		</Wrapper>
	);
};

export default Header;
