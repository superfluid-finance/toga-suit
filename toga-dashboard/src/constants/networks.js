import sfMeta from "@superfluid-finance/metadata";

const PROVIDER_URL_TEMPLATE = `https://rpc-endpoints.superfluid.dev/{{network}}`;

export const UNSUPPORTED = { name: 'Unsupported network' };

export const NETWORK_LIST = sfMeta.networks
	.filter(n => n.contractsV1.toga !== undefined);

export function getNetworkByName(name) {
	return (
		NETWORK_LIST.find((n) => n.name === name) ||
		UNSUPPORTED
	);
}

export function getNetworkByChainId(chainId) {
	return (
		NETWORK_LIST.find((n) => n.chainId === chainId) ||
		UNSUPPORTED
	);
}

export function getPrimaryProviderUrl(networkName) {
	return PROVIDER_URL_TEMPLATE.replace("{{network}}", networkName);
}
