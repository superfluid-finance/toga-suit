import React, { useContext, useEffect } from 'react';
import Button from '../Button';
import styled from 'styled-components';
import CopyableAddress from '../common/CopyableAddress';
import { useConnectButton } from '../wallet/ConnectButtonProvider';
import { NetworkContext, ProviderOrSignerContext } from '../context';
import { NETWORK_LIST, tryFindNetwork } from '../../constants/networks';
import { ethers } from 'ethers';

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

	const { setSelectedNetwork } = useContext(NetworkContext);

	const { setEthersProvider } = useContext(ProviderOrSignerContext);

	useEffect(() => {
		if (chain) {
			const network = tryFindNetwork(NETWORK_LIST, chain?.id);
			setSelectedNetwork(network);
			let customHttpProvider = new ethers.providers.JsonRpcProvider(
				network.rpcUrls.superfluid,
			);
			setEthersProvider(customHttpProvider);
		}
	}, [chain, setEthersProvider, setSelectedNetwork]);

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
						<div
							onClick={() => openChainModal()}
							style={{
								display: 'flex',
								alignItems: 'center',
								width: '180px',
							}}
						>
							{chain.hasIcon && (
								<div
									style={{
										background: chain.iconBackground,
										width: 12,
										height: 12,
										borderRadius: 999,
										overflow: 'hidden',
										marginRight: 4,
									}}
								>
									{chain.iconUrl && (
										<img
											alt={chain.name ?? 'Chain icon'}
											src={chain.iconUrl}
											style={{
												width: 12,
												height: 12,
											}}
										/>
									)}
								</div>
							)}
							{chain.name}
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								width: '210px',
							}}
							onClick={openAccountModal}
						>
							{account.displayName}
							{account.displayBalance
								? ` (${account.displayBalance})`
								: ''}
						</div>
					</div>
				}
				address={account.address}
			/>
		</ConnectedAccountContainer>
	);
}

export default ConnectWalletButton;
