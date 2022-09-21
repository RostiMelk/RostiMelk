import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
	children: React.ReactNode;
};

const Wrapper = styled.main`
	max-width: var(--container-width);
	margin: 48px auto;
	padding: 0 var(--container-gutter);
`;

const Container = ({ children }: ContainerProps) => {
	return <Wrapper>{children}</Wrapper>;
};

export default Container;
