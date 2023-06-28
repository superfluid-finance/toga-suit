import sfMeta from '@superfluid-finance/metadata';
import * as chain from 'wagmi/chains';
const PROVIDER_URL_TEMPLATE = `https://rpc-endpoints.superfluid.dev/{{network}}`;

export const UNSUPPORTED = { name: 'Unsupported network' };

export const updatedChainDefination = {
	[chain.goerli.id]: {
		...chain.goerli,
		rpcUrls: {
			...chain.goerli.rpcUrls,
			superfluid: 'https://rpc-endpoints.superfluid.dev/eth-goerli',
		},
	},
	[chain.gnosis.id]: {
		...chain.gnosis,
		iconUrl: "/icons/network/gnosis.svg",
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/xdai-mainnet',
		},
	},
	[chain.polygon.id]: {
		...chain.polygon,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/polygon-mainnet',
		},
	},
	[chain.polygonMumbai.id]: {
		...chain.polygonMumbai,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/polygon-mumbai',
		},
	},
	[chain.avalancheFuji.id]: {
		...chain.avalancheFuji,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/avalanche-fuji',
		},
	},
	[chain.optimism.id]: {
		...chain.optimism,

		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/optimism-mainnet',
		},
	},
	[chain.arbitrum.id]: {
		...chain.arbitrum,

		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/arbitrum-one',
		},
	},
	[chain.avalanche.id]: {
		...chain.avalanche,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/avalanche-c',
		},
	},
	[chain.bsc.id]: {
		...chain.bsc,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/bsc-mainnet',
		},
	},
	[chain.mainnet.id]: {
		...chain.mainnet,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/eth-mainnet',
		},
	},
	[chain.celo.id]: {
		...chain.celo,
		iconUrl: "/icons/network/celo-mainnet.svg",
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/celo-mainnet',
		},
	},
	[chain.optimismGoerli.id]: {
		...chain.optimismGoerli,
		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/optimism-goerli',
		},
	},
	[chain.arbitrumGoerli.id]: {
		...chain.arbitrumGoerli,

		rpcUrls: {
			superfluid: 'https://rpc-endpoints.superfluid.dev/arbitrum-goerli',
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
