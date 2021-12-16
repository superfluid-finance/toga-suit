import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { GET_TOKEN_STATISTICS } from '../../helper/graphQueries';
import { naturalUnitToReadable } from '../../helper/tokenUtils';
import { SelectedTokenContext } from '../context';
import InfoBox from '../InfoBox';
import { InfoBoxesContainer } from '../InfoBox/commonElements';
import TotalSupplyInfoWrapper from '../TotalSupplyInfoWrapper';

function TokenInfo() {
	const selectedToken = useContext(SelectedTokenContext);
	const { loading, data } = useQuery(GET_TOKEN_STATISTICS, {
		variables: { tokenId: selectedToken.id },
		pollInterval: 15000,
	});

	const {
		totalNumberOfActiveStreams,
		totalSupply,
		token,
		totalAmountStreamedUntilUpdatedAt,
	} = data ? data.tokenStatistics[0] : {};
	return (
		<InfoBoxesContainer>
			<React.Fragment>
				<TotalSupplyInfoWrapper
					token={token}
					totalSupply={totalSupply}
					loading={loading}
				/>
				<InfoBox
					title={'Active Streams'}
					secondaryInfo={'Streams with the flow rate above 0'}
					data={totalNumberOfActiveStreams}
					loading={loading}
				/>
				<InfoBox
					title={'Value Streamed'}
					secondaryInfo={'Total value streamed'}
					data={naturalUnitToReadable(
						totalAmountStreamedUntilUpdatedAt,
						selectedToken,
					)}
					loading={loading}
				/>
			</React.Fragment>
		</InfoBoxesContainer>
	);
}

export default TokenInfo;
