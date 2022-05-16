import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { NetworkContext, ProviderOrSignerContext } from '../context';
import PageLoader from '../Loader';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { abbreviateAddress } from '../../helper/tokenUtils';
import {
	getNetworkByEthersId,
	GOERLI,
	KOVAN,
	MATIC,
	MUMBAI,
	RINKEBY,
	ROPSTEN,
	XDAI,
	ARBITRUM,
	AVALANCHE,
	OPTIMISM,
} from '../../constants/networks';
import { isWalletConnected } from '../../helper/web3Utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CopyableAddress from '../common/CopyableAddress';

const getProviderOptions = (networkShortName) => ({
	walletconnect: {
		network: networkShortName,
		display: {
			name: 'Wallet Connect',
		},
		package: WalletConnectProvider,
		options: {
			rpc: {
				3: ROPSTEN.rpcUrl,
				4: RINKEBY.rpcUrl,
				5: GOERLI.rpcUrl,
				42: KOVAN.rpcUrl,
				80001: MUMBAI.rpcUrl,
				100: XDAI.rpcUrl,
				137: MATIC.rpcUrl,
				10: OPTIMISM.rpcUrl,
				42161: ARBITRUM.rpcUrl,
				43114: AVALANCHE.rpcUrl,
			},
		},
	},
});

const init = (network) => {
	return new SafeAppWeb3Modal({
		cacheProvider: true,
		network: network.toLowerCase(),
		providerOptions: getProviderOptions(network),
	});
};

const ConnectedAccountContainer = styled.div`
	height: 100%;
	display: flex;
	padding: 15px;
	border-radius: 4px;
	border: 1px solid ${(props) => props.theme.colors.border};
	justify-content: center;
	align-items: center;
	width: fit-content;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

function ConnectWalletButton() {
	const { setEthersProvider, ethersProvider } = useContext(
		ProviderOrSignerContext,
	);
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState('');
	const { selectedNetwork, setSelectedNetwork } = useContext(NetworkContext);
	const connectWallet = async () => {
		if (!selectedNetwork) {
			return;
		}
		setLoading(true);
		const modal = init(selectedNetwork.name);
		modal.clearCachedProvider();

		try {
			const web3Provider = await modal.requestProvider();
			// Supports signing
			const ethersProviderOrSigner = new ethers.providers.Web3Provider(
				web3Provider,
				'any',
			);
			ethersProviderOrSigner.getSigner();
			setEthersProvider(ethersProviderOrSigner);
		} catch (e) {
			console.log('Unable to connect to the provider', e);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (!ethersProvider) {
			return;
		}
		const networkChange = (newNetwork) => {
			//fixture ethers names
			if(newNetwork.chainId === 43114) {
				newNetwork.name = "avalanche"
			}
			
			if (selectedNetwork.ethersId !== newNetwork.name) {
				setSelectedNetwork(getNetworkByEthersId(newNetwork.name));
			}
		};
		const accountsChange = async () => {
			setLoading(true);
			const modal = init(selectedNetwork.name);
			const web3Provider = await modal.connect();
			// Supports signing
			const ethersProviderOrSigner = new ethers.providers.Web3Provider(
				web3Provider,
				'any',
			);
			setEthersProvider(ethersProviderOrSigner);
			setLoading(false);
		};
		ethersProvider.on('network', networkChange);
		if (window.ethereum) {
			window.ethereum.on('accountsChanged', accountsChange);
		}
		return () => {
			ethersProvider.off('network', networkChange);
			if (window.ethereum) {
				window.ethereum.removeListener(
					'accountsChanged',
					accountsChange,
				);
			}
		};
	}, [
		ethersProvider,
		selectedNetwork,
		setEthersProvider,
		setSelectedNetwork,
	]);

	useEffect(() => {
		if (!ethersProvider) {
			return;
		}
		const setSignerAddress = async () => {
			if (!isWalletConnected(ethersProvider)) {
				return;
			}
			setAddress(await ethersProvider.getSigner().getAddress());
		};
		setSignerAddress();
	}, [ethersProvider]);

	useEffect(() => {
		if (ethersProvider) {
			return;
		}
		const initConnection = async () => {
			if (!selectedNetwork) {
				return;
			}
			setLoading(true);
			const ethersProviderOrSigner = new ethers.providers.JsonRpcProvider(
				selectedNetwork.rpcUrl,
			);
			setEthersProvider(ethersProviderOrSigner);
			setLoading(false);
		};
		initConnection();
	}, [selectedNetwork, ethersProvider, setEthersProvider]);

	let content;
	if (loading) {
		content = (
			<ConnectedAccountContainer>
				<PageLoader />
			</ConnectedAccountContainer>
		);
	} else if (!!address) {
		content = (
			<ConnectedAccountContainer>
				<CopyableAddress
					toDisplay={abbreviateAddress(address)}
					address={address}
				/>
			</ConnectedAccountContainer>
		);
	} else {
		content = <Button text={'Connect wallet'} onClick={connectWallet} />;
	}

	return content;
}

export default ConnectWalletButton;
