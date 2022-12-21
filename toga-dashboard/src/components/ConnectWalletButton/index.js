import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { NetworkContext, ProviderOrSignerContext } from '../context';
import PageLoader from '../Loader';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { abbreviateAddress } from '../../helper/tokenUtils';
import {
	NETWORK_LIST,
	getNetworkByChainId,
	getPrimaryProviderUrl,
	getNetworkByName
} from '../../constants/networks';
import { isWalletConnected } from '../../helper/web3Utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CopyableAddress from '../common/CopyableAddress';

const getProviderOptions = (networkName) => ({
	walletconnect: {
		// ChatGPT claims we can use chainId here. Can we?
		// the field "network" takes name strings which differ
		// from canonical names as defined by SF
		// We can either use chainId or need to have a mapping to
		// wagmi (?) names
		chainId: getNetworkByName(networkName).chainId,
		display: {
			name: 'Wallet Connect',
		},
		package: WalletConnectProvider,
		options: {
			// creates an object based list with
			// the chainId as key and the url as value
			rpc: NETWORK_LIST.reduce((acc, network) => {
				acc[network.chainId] = getPrimaryProviderUrl(network.name);
				return acc;
			}, {})
		},
	},
});

const init = (networkName) => {
	return new SafeAppWeb3Modal({
		cacheProvider: true,
		providerOptions: getProviderOptions(networkName),
		// field "network" is optional and omitted
		// in order not to interfere with WalletConnect
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
		// "newNetwork" here refers to a data structure provided by wagmi
		// use chainId, because the "name" field may not match
		// see network list at https://github.com/wagmi-dev/references/tree/master/packages/chains/src
		const networkChange = (newNetwork) => {
			if (selectedNetwork.chainId !== newNetwork.chainId) {
				setSelectedNetwork(getNetworkByChainId(newNetwork.chainId));
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
			if (!selectedNetwork || selectedNetwork.chainId === undefined) {
				return;
			}
			setLoading(true);
			const primaryProviderUrl = getPrimaryProviderUrl(selectedNetwork.name);
			const ethersProviderOrSigner = new ethers.providers.JsonRpcProvider(
				primaryProviderUrl,
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
