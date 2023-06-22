import { ethers } from 'ethers';

export function isWalletConnected(ethersProvider) {
	// Connected wallet uses ethers.providers.Web3Provider, otherwise ethers.providers.JsonRpcProvider
	return ethersProvider instanceof ethers.providers.Web3Provider;
}
