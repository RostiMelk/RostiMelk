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
	position: relative;
	display: block;
	margin-bottom: 20px;
	padding: 22px;
	border-radius: var(--card-radius);
	color: var(--color-text);
	text-decoration: none;
	background: var(--color-card);
	transition: all 0.3s ease-in-out;

	&:before {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--card-radius);
		content: '';
		background: var(--color-card);
		transition: opacity 0.3s ease-in-out;
		filter: blur(20px);
		transform: scale(0.9);
	}

	&:hover:before,
	&:focus-within:before {
		opacity: 0.4;
	}
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
	background: var(--color-card);

	svg {
		width: 26px;
		height: 26px;
	}
`;

const Title = styled.h3`
	margin: 0;
	font-weight: 500;
	font-size: 21px;
	letter-spacing: 1px;

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
