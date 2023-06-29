import React, { useContext, useEffect } from 'react';
import Button from '../Button';
import styled from 'styled-components';
import CopyableAddress from '../common/CopyableAddress';
import { useConnectButton } from '../wallet/ConnectButtonProvider';
import { JsonRpcProvider, NetworkContext, SignerContext } from '../context';
import { NETWORK_LIST, tryFindNetwork } from '../../constants/networks';
import { useEthersSigner } from '../wallet/wagmiEthersAdapters';
import { providers } from 'ethers';

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
	const {
		account,
		chain,
		openAccountModal,
		openChainModal,
		openConnectModal,
		authenticationStatus,
		mounted,
	} = useConnectButton();

	const { setSelectedNetwork, selectedNetwork } = useContext(NetworkContext);
	const { setSigner } = useContext(SignerContext);
	const { setJsonRPCProvider } = useContext(JsonRpcProvider);

	const signer = useEthersSigner();

	useEffect(() => {
		if (selectedNetwork && !chain) {
			const network = tryFindNetwork(NETWORK_LIST, selectedNetwork?.id);
			setSelectedNetwork(network);
			setJsonRPCProvider(
				new providers.JsonRpcProvider(network.rpcUrls.superfluid),
			);
			setSigner(null);
		}

		if (chain) {
			const network = tryFindNetwork(NETWORK_LIST, chain?.id);
			setSelectedNetwork(network);
			setJsonRPCProvider(
				new providers.JsonRpcProvider(network.rpcUrls.superfluid),
			);
		}

		if (signer) {
			setSigner(signer);
		}
	}, [
		chain,
		setJsonRPCProvider,
		setSigner,
		setSelectedNetwork,
		signer,
		selectedNetwork,
	]);

	// Note: If your app doesn't use authentication, you
	// can remove all 'authenticationStatus' checks

	const ready = mounted && authenticationStatus !== 'loading';

	const connected =
		ready &&
		account &&
		chain &&
		(!authenticationStatus || authenticationStatus === 'authenticated');

	if (!connected) {
		return <Button text={'Connect wallet'} onClick={openConnectModal} />;
	}

	if (chain.unsupported) {
		return <Button onClick={openChainModal} text={'Wrong network'} />;
	}

	return (
		<ConnectedAccountContainer>
			<CopyableAddress
				children={
					<div style={{ display: 'flex' }}>
						{account.displayName}
						{account.displayBalance
							? ` (${account.displayBalance})`
							: ''}
					</div>
				}
				address={account.address}
			/>
		</ConnectedAccountContainer>
	);
}

export default ConnectWalletButton;
