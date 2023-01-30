import React from 'react';
import styled from 'styled-components';

import { NETWORK_LIST } from '../../constants/networks';

const FullScreenBG = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: ${(props) => (props.enabled ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: rgba(130, 146, 173, 0.6);
`;

export const NetworkSelection = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 40%;
	max-width: 700px;
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.background};
	padding: 30px 20px;

	@media screen and (max-width: 768px) {
		align-items: center;
	}
`;

export const NetworkSelectionListItem = styled.li`
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 100%;
	background-color: ${(props) => props.theme.colors.info};
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.colors.lightAccent};
	}
`;

export const Network = styled.div`
	width: 100%;
	margin: 10px;
	font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const NetworkSelectionListContainer = styled.ul`
	display: flex;
	flex: 1;
	flex-direction: column;
	max-height: 500px;
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.info};
	padding: 0;
	overflow-y: auto;
	overflow-x: hidden;

	& ${NetworkSelectionListItem} {
		border-bottom: 1px solid ${(props) => props.theme.colors.border};
	}

	& ${NetworkSelectionListItem}:last-child {
		border-bottom: 0;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: ${(props) => props.theme.colors.accent};
	}

	&::-webkit-scrollbar {
		width: 12px;
		background-color: ${(props) => props.theme.colors.background};
	}

	&::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: ${(props) => props.theme.colors.background};
	}
`;

export const NetworkSelectionHeader = styled.h2`
	font-weight: 400;
	font-size: ${(props) => props.theme.fontSizes.medium};
	color: ${(props) => props.theme.colors.text};
`;

function NetworkSelectionModal({ enabled, setSelectedNetwork }) {
	return (
		<FullScreenBG enabled={enabled}>
			<NetworkSelection>
				<NetworkSelectionHeader>
					Select a network from the list below
					<NetworkSelectionListContainer>
						{NETWORK_LIST.map((network) => (
							<NetworkSelectionListItem
								key={network.name}
								onClick={() => setSelectedNetwork(network)}
							>
								<Network>
									{network.humanReadableName + (network.isTestnet ? " (Testnet)" : "")}
								</Network>
							</NetworkSelectionListItem>
						))}
					</NetworkSelectionListContainer>
				</NetworkSelectionHeader>
			</NetworkSelection>
		</FullScreenBG>
	);
}

export default NetworkSelectionModal;
