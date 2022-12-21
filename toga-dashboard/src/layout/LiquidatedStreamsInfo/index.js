import React, { useContext } from 'react';
import styled from 'styled-components';
import SectionHeader from '../../components/common/SectionHeader';
import { NetworkContext } from '../../components/context';
import LiquidatedStreams from '../../components/LiquidatedStreams';

const LiquidatedStreamsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const LiquidatedStreamsDetails = styled.div`
	font-size: ${(props) => props.theme.fontSizes.medium};
	color: ${(props) => props.theme.colors.secondaryText};
	margin-top: 20px;
	@media screen and (max-width: 768px) {
		text-align: center;
	}
`;

function LiquidatedStreamsInfo() {
	const { selectedNetwork } = useContext(NetworkContext);
	return (
		<LiquidatedStreamsContainer>
			<SectionHeader text={'Liquidated streams'} />

			<LiquidatedStreamsDetails>
				{`Liquidated streams for the tokens on ${selectedNetwork.humanReadableName}`}
			</LiquidatedStreamsDetails>
			<LiquidatedStreams />
		</LiquidatedStreamsContainer>
	);
}

export default LiquidatedStreamsInfo;
