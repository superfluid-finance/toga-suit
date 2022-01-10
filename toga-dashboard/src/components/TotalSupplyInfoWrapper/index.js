import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBox from '../InfoBox';
import { COUNT, USD } from '../../constants/unit';
import {
	fetchTokenUsdValue,
	fromNaturalUnit,
	naturalUnitToReadable,
} from '../../helper/tokenUtils';
import { NetworkContext, SelectedTokenContext } from '../context';

const UnitToggleContainer = styled.div`
	display: flex;
	position: relative;
	max-width: 180px;
	height: 100%;
	border-radius: 20px;
	background-color: ${(props) => props.theme.colors.lightAccent};
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const OptionContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 50%;
	border-radius: 20px;
	font-size: ${(props) => props.theme.fontSizes.small};
	z-index: 9;
	color: ${(props) => props.theme.colors.text};
	cursor: pointer;
`;

const OptionToggle = styled.div`
	position: absolute;
	width: 50%;
	height: 100%;
	border-radius: 20px;
	background-color: ${(props) => props.theme.colors.accent};
	left: ${(props) => (props.selectedUnit === COUNT ? '0px' : 'unset')};
	right: ${(props) => (props.selectedUnit === USD ? '0px' : 'unset')};
`;

const TOKEN_NOT_SUPPORTED = 'Token not supported';

function TotalSupplyInfoWrapper({ loading, token, totalSupply }) {
	const [selectedUnit, setSelectedUnit] = useState(COUNT);
	const [usdValue, setUsdValue] = useState(null);
	const [loadingUsdValue, setLoadingUsdValue] = useState(null);
	const { selectedNetwork } = useContext(NetworkContext);
	const selectedToken = useContext(SelectedTokenContext);

	useEffect(() => {
		if (!token || loading) {
			return;
		}
		if (totalSupply == null) {
			setUsdValue(TOKEN_NOT_SUPPORTED);
			return;
		}
		const setTokenUsdValue = async () => {
			setLoadingUsdValue(true);
			let usdValue = null;
			if (token.underlyingToken) {
				usdValue = await fetchTokenUsdValue(
					selectedNetwork.coinGeckoId,
					token.underlyingToken.id,
				);
			}

			if (usdValue == null) {
				usdValue = await fetchTokenUsdValue(
					selectedNetwork.coinGeckoId,
					token.id,
				);
			}
			if (usdValue != null) {
				setUsdValue(
					fromNaturalUnit(totalSupply, token) * usdValue + ' USD',
				);
			} else {
				setUsdValue(TOKEN_NOT_SUPPORTED);
			}
			setLoadingUsdValue(false);
		};
		setTokenUsdValue();
	}, [token, totalSupply, selectedNetwork, loading]);

	const UnitToggle = (
		<UnitToggleContainer>
			<OptionToggle selectedUnit={selectedUnit} />
			<OptionContainer onClick={() => setSelectedUnit(COUNT)}>
				COUNT
			</OptionContainer>
			<OptionContainer onClick={() => setSelectedUnit(USD)}>
				USD
			</OptionContainer>
		</UnitToggleContainer>
	);
	return (
		<InfoBox
			title={'Total Supply'}
			secondaryInfo={UnitToggle}
			data={
				selectedUnit === COUNT
					? naturalUnitToReadable(totalSupply, selectedToken)
					: usdValue
			}
			loading={
				selectedUnit === COUNT ? loading : loadingUsdValue || loading
			}
		/>
	);
}

export default TotalSupplyInfoWrapper;
