import sfMeta from '@superfluid-finance/metadata';
import * as chain from 'wagmi/chains';
const PROVIDER_URL_TEMPLATE = `https://rpc-endpoints.superfluid.dev/{{network}}`;

export const UNSUPPORTED = { name: 'Unsupported network' };

export const updatedChainDefination = {
	[chain.goerli.id]: {
		...chain.goerli,
		rpcUrls: {
			...chain.goerli.rpcUrls,
			superfluid: getPrimaryProviderUrl('eth-goerli'),
		},
	},
	[chain.gnosis.id]: {
		...chain.gnosis,
		iconUrl: "/icons/network/gnosis.svg",
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('xdai-mainnet'),
		},
	},
	[chain.polygon.id]: {
		...chain.polygon,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('polygon-mainnet'),
		},
	},
	[chain.polygonMumbai.id]: {
		...chain.polygonMumbai,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('polygon-mumbai'),
		},
	},
	[chain.avalancheFuji.id]: {
		...chain.avalancheFuji,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('avalanche-fuji'),
		},
	},
	[chain.optimism.id]: {
		...chain.optimism,

		rpcUrls: {
			superfluid: getPrimaryProviderUrl('optimism-mainnet'),
		},
	},
	[chain.arbitrum.id]: {
		...chain.arbitrum,

		rpcUrls: {
			superfluid: getPrimaryProviderUrl('arbitrum-one'),
		},
	},
	[chain.avalanche.id]: {
		...chain.avalanche,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('avalanche-c'),
		},
	},
	[chain.bsc.id]: {
		...chain.bsc,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('bsc-mainnet'),
		},
	},
	[chain.mainnet.id]: {
		...chain.mainnet,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('eth-mainnet'),
		},
	},
	[chain.celo.id]: {
		...chain.celo,
		iconUrl: "/icons/network/celo-mainnet.svg",
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('celo-mainnet'),
		},
	},
	[chain.optimismGoerli.id]: {
		...chain.optimismGoerli,
		rpcUrls: {
			superfluid: getPrimaryProviderUrl('optimism-goerli'),
		},
	},
	[chain.arbitrumGoerli.id]: {
		...chain.arbitrumGoerli,

		rpcUrls: {
			superfluid: getPrimaryProviderUrl('arbitrum-goerli'),
		},
	},
};

export const NETWORK_LIST = sfMeta.networks
	.map((x) => {
		return { ...x, ...updatedChainDefination[x.chainId] };
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
