import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LoadingBubbles } from '../images/loader.svg';

const PageLoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

function PageLoader() {
	return (
		<PageLoaderContainer>
			<LoadingBubbles />
		</PageLoaderContainer>
	);
}

export default PageLoader;
