import React from 'react';
import styled from 'styled-components';

type FooterProps = {
	children: React.ReactNode;
};

const Wrapper = styled.footer`
	text-align: center;
	margin-block: 38px;

	p {
		margin: 8px 0;
	}
`;

const getCurrentYear = () => {
	const date = new Date();
	return date.getFullYear();
};

const Footer = ({ children }: FooterProps) => {
	const currentYear = getCurrentYear();
	return (
		<Wrapper>
			{children}
			<p>{currentYear}</p>
		</Wrapper>
	);
};

export default Footer;
