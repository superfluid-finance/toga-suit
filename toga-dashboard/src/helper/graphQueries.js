import gql from 'graphql-tag';

export const GET_SUPER_TOKENS = gql`
	query GetSuperTokens {
		tokens(where: { isSuperToken: true }, first: 1000) {
			id
			symbol
			decimals
		}
	}
`;

export const GET_TOKEN_STATISTICS = gql`
	query GetTokenStatistics($tokenId: String!) {
		tokenStatistics(where: { id: $tokenId }) {
			id
			totalSupply
			totalNumberOfActiveStreams
			totalAmountStreamedUntilUpdatedAt
			token {
				id
				underlyingToken {
					id
				}
				decimals
			}
		}
	}
`;

export const GET_LIQUIDATION_EVENTS = gql`
	query GetLiquidationEvents(
		$first: Int!
		$skip: Int!
		$where: AgreementLiquidatedV2Event_filter
	) {
		agreementLiquidatedV2Events(
			first: $first
			skip: $skip
			orderBy: timestamp
			orderDirection: desc
			where: $where
		) {
			id
			liquidationType
			targetAccount
			rewardAmount
			timestamp
			transactionHash
			token
		}
	}
	`;