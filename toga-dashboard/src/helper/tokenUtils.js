import { utils } from 'ethers';
import memoizee from 'memoizee';

const SECONDS_IN_A_DAY = 86400;

export function abbreviateAddress(address) {
	if (!address) {
		return '';
	}
	return `${address.substr(0, 6)}...${address.substr(-4)}`;
}

export function getTokenString(token) {
	if (!token) {
		return '';
	}
	return `${!token.isListed ? ' (unlisted) ' : ''}${token.symbol} (${abbreviateAddress(token.id)})`;
}

async function fetchTokenUsd(networkGoinGeckoId, tokenAddress) {
	if (!networkGoinGeckoId) {
		return null;
	}
	const priceUrl = `https://api.coingecko.com/api/v3/simple/token_price/${networkGoinGeckoId}?contract_addresses=${tokenAddress}&vs_currencies=usd`;
	let tokenData;
	try {
		tokenData = await (await fetch(priceUrl)).json();
	} catch (e) {
		console.error('Unable to query CoinGecko API', e);
	}
	const tokenInfo = tokenData && tokenData[tokenAddress];
	if (!tokenInfo) {
		return null;
	}
	return tokenInfo.usd;
}

export const fetchTokenUsdValue = memoizee(fetchTokenUsd, {
	promise: true,
	maxAge: 600000,
});

export function generateTokenMap(tokens) {
	const tokenMap = new Map();
	tokens.forEach((token) => {
		tokenMap.set(token.id, {
			id: token.id,
			readable: getTokenString(token),
			symbol: token.symbol,
			decimals: token.decimals,
			isListed: token.isListed,
		});
	});
	return tokenMap;
}

export function naturalUnitToDailyReadable(naturalUnits, token) {
	return naturalUnitToReadable(naturalUnits * SECONDS_IN_A_DAY, token);
}

export function naturalUnitToReadable(naturalUnits, token) {
	return fromNaturalUnit(naturalUnits, token) + ' ' + token.symbol;
}

export function fromNaturalUnit(naturalUnits, token) {
	return parseFloat((naturalUnits / 10 ** token.decimals).toFixed(7));
}

export function toNaturalUnit(naturalUnits, token) {
	// eslint-disable-next-line no-undef
	return BigInt(Math.round(naturalUnits * 10 ** token.decimals));
}

export function encodeToNaturalUnitsFromDaily(amount, token) {
	return encodeToNaturalUnits(amount / SECONDS_IN_A_DAY, token);
}

export function encodeToNaturalUnits(amount, token) {
	return amount !== undefined
		? utils.defaultAbiCoder.encode(
				['int96'],
				[toNaturalUnit(amount, token)],
		  )
		: '0x';
}
