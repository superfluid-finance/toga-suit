// TODO: replace strings with env variables
export const XDAI = {
	name: 'xDAI',
	coinGeckoId: 'xdai',
	ethersId: 'xdai',
	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-xdai',
	togaAddress: '0x0942570634A80bcd096873afC9b112A900492fd7',
	rpcUrl: process.env.REACT_APP_XDAI_RPC_URL,
	getTxLink: (transactionId) =>
		`https://blockscout.com/xdai/mainnet/tx/${transactionId}`,
};
export const MATIC = {
	name: 'Matic',
	coinGeckoId: 'polygon-pos',
	ethersId: 'matic',
	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic',
	togaAddress: '0x1b18770E5198983AF04B3735d01E09A57d27bD43',
	rpcUrl: process.env.REACT_APP_MATIC_RPC_URL,
	getTxLink: (transactionId) => `https://polygonscan.com/tx/${transactionId}`,
};
export const MUMBAI = {
	name: 'Mumbai',
	ethersId: 'maticmum',
	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
	rpcUrl: process.env.REACT_APP_MUMBAI_RPC_URL,
	getTxLink: (transactionId) =>
		`https://mumbai.polygonscan.com/tx/${transactionId}`,
};
export const GOERLI = {
	name: 'Goerli',
	ethersId: 'goerli',

	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli',
	rpcUrl: process.env.REACT_APP_GOERLI_RPC_URL,
	getTxLink: (transactionId) =>
		`https://goerli.etherscan.io/tx/${transactionId}`,
};
export const ROPSTEN = {
	name: 'Ropsten',
	ethersId: 'ropsten',

	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-ropsten',
	rpcUrl: process.env.REACT_APP_ROPSTEN_RPC_URL,
	getTxLink: (transactionId) =>
		`https://ropsten.etherscan.io/tx/${transactionId}`,
};
export const KOVAN = {
	name: 'Kovan',
	ethersId: 'kovan',

	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-kovan',
	rpcUrl: process.env.REACT_APP_KOVAN_RPC_URL,
	getTxLink: (transactionId) =>
		`https://kovan.etherscan.io/tx/${transactionId}`,
};
export const RINKEBY = {
	name: 'Rinkeby',
	ethersId: 'rinkeby',

	graphUrl:
		'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-rinkeby',
	rpcUrl: process.env.REACT_APP_RINKEBY_RPC_URL,
	getTxLink: (transactionId) =>
		`https://rinkeby.etherscan.io/tx/${transactionId}`,
};
export const UNSUPPORTED = { name: 'Unsupported network' };

export const NETWORK_LIST = [
	XDAI,
	MATIC,
	MUMBAI,
	GOERLI,
	ROPSTEN,
	KOVAN,
	RINKEBY,
];

export function getNetworkByEthersId(etherName) {
	return (
		NETWORK_LIST.find((n) => n.ethersId === etherName.toLowerCase()) ||
		UNSUPPORTED
	);
}
