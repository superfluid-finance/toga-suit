import sfMeta from '@superfluid-finance/metadata';
import * as wagmiChains from 'wagmi/chains';
const PROVIDER_URL_TEMPLATE = `https://rpc-endpoints.superfluid.dev/{{network}}`;

export const UNSUPPORTED = { name: 'Unsupported network' };

export const NETWORK_LIST = sfMeta.networks
	.map((n) => {
		const wagmiChain = Object.values(wagmiChains).find(item => item.id === n.chainId);
		return {
			...n,
			...wagmiChain,
			rpcUrls: { // merge wagmi provided rpc url's with superfluid's
				...wagmiChain.rpcUrls,
				superfluid: `https://rpc-endpoints.superfluid.dev/${n.name}`
			},
			subgraphUrl: `https://${n.name}.subgraph.x.superfluid.dev`
		};
	})
	.filter((n) => n.contractsV1.toga !== undefined);

export const tryFindNetwork = (networks, value) => {
	const asNumber = Number(value);
	if (isFinite(asNumber)) {
		return networks.find((x) => x.id === asNumber);
	}
	return undefined;
};

export const findNetworkOrThrow = (networks, value) => {
	const network = tryFindNetwork(networks, value);
	if (!network) {
		throw new Error(
			`Network ${value}  not found. This should never happen.`,
		);
	}
	return network;
};

export function getNetworkByName(name) {
	return NETWORK_LIST.find((n) => n.name === name) || UNSUPPORTED;
}

export function getNetworkByChainId(chainId) {
	return NETWORK_LIST.find((n) => n.id === chainId) || UNSUPPORTED;
}

export function getPrimaryProviderUrl(networkName) {
	return PROVIDER_URL_TEMPLATE.replace('{{network}}', networkName);
}
