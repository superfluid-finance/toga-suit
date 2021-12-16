import React from 'react';
import styled from 'styled-components';
import PageLoader from '../Loader';
import { InfoBoxContainer } from './commonElements';

const Title = styled.div`
	font-size: ${(props) => props.theme.fontSizes.mediumLarge};
	margin-bottom: 10px;
`;

const DataContainer = styled.div`
	margin-top: 40px;
	font-size: ${(props) => props.theme.fontSizes.medium};
`;

const SecondaryInfoContainer = styled.div`
	font-size: ${(props) => props.theme.fontSizes.small};
	color: ${(props) => props.theme.colors.secondaryText};
	height: 30px;

	@media screen and (max-width: 768px) {
		display: flex;
		justify-content: center;
		width: 100%;
		text-align: center;
	}
`;

function InfoBox({ title, secondaryInfo, data, loading }) {
	return (
		<InfoBoxContainer>
			<Title>{title}</Title>
			<SecondaryInfoContainer>{secondaryInfo}</SecondaryInfoContainer>
			<DataContainer>{loading ? <PageLoader /> : data}</DataContainer>
		</InfoBoxContainer>
	);
}

export default InfoBox;
