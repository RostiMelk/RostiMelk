import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib/cjs';

type WrapperProps = {};

type CardProps = {
	title: string;
	icon: IconType;
	className?: string;
	children?: React.ReactNode;
	href?: string;
	hide?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
	margin-bottom: 20px;
	padding: 22px;
	border-radius: 20px;
	display: block;
	background-color: var(--color-card);
	text-decoration: none;
	color: var(--color-text);
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	column-gap: 14px;
`;

const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background-color: var(--color-card);

	svg {
		width: 26px;
		height: 26px;
	}
`;

const Title = styled.h3`
	margin: 0;
	font-weight: 500;
	font-size: 21px;

	@media (min-width: 1024px) {
		font-size: 24px;
	}
`;

const ChildrenWrapper = styled.div`
	margin-top: 26px;
`;

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
	const { title, icon: Icon, className, children, href, hide } = props;

	if (hide) {
		return null;
	}

	return (
		<Wrapper
			ref={ref}
			className={className}
			as={href ? 'a' : 'div'}
			href={href}
			target={href && '_blank'}
			rel={href && 'noopener'}
		>
			<Header>
				<IconWrapper>
					<Icon />
				</IconWrapper>
				<Title>{title}</Title>
			</Header>

			{children && <ChildrenWrapper>{children}</ChildrenWrapper>}
		</Wrapper>
	);
});

export default Card;
