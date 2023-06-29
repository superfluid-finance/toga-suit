import { ethers } from 'ethers';

export function isWalletConnected(signer) {
	if(!signer) return false;

	// Connected wallet uses ethers.providers.Web3Provider, otherwise ethers.providers.JsonRpcProvider
	return signer.provider instanceof ethers.providers.Web3Provider;
}
