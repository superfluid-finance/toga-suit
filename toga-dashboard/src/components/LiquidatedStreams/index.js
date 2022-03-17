import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { REGULAR, PLEB, PIRATE  } from '../../constants/liquidationType';
import { GET_LIQUIDATION_EVENTS } from '../../helper/graphQueries';
import Button from '../Button';
import PageLoader from '../Loader';
import Filter from './Filter';
import LiquidatedStreamTable from './LiquidatedStreamsTable';

const LoadMoreBtnContainer = styled.div`
	width: fit-content;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const LiquidatedStreamsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 50px;
	row-gap: 20px;
`;

function getFilter(liqTypes = [], selectedTokens = []) {
	const filter = {};
	if (liqTypes.includes(REGULAR.value) && liqTypes.length === 1) {
		filter.liquidationType = 0;
	}
	if (liqTypes.includes(PLEB.value) && liqTypes.length === 1) {
		filter.liquidationType = 1;
	}
	if (liqTypes.includes(PIRATE.value) && liqTypes.length === 1) {
		filter.liquidationType = 2;
	}

	if (selectedTokens.length > 0) {
		filter.token_in = selectedTokens;
	}
	return filter;
}

function LiquidatedStreams() {
	const [selectedTokenIds, setSelectedTokenIds] = useState([]);
	const [selectedLiqTypes, setLiqTypes] = useState([]);
	const { loading, data, error, fetchMore, refetch } = useQuery(
		GET_LIQUIDATION_EVENTS,
		{
			variables: {
				first: 20,
				skip: 0,
			},
			notifyOnNetworkStatusChange: true,
		},
	);

	return (
		<LiquidatedStreamsContainer>
			<Filter
				setSelectedTokenIds={setSelectedTokenIds}
				selectedTokenIds={selectedTokenIds}
				selectedLiqTypes={selectedLiqTypes}
				setLiqTypes={setLiqTypes}
				applyFilter={() =>
					refetch({
						skip: 0,
						where: getFilter(selectedLiqTypes, selectedTokenIds),
					})
				}
			/>
			{!error && loading && !data ? (
				<PageLoader />
			) : (
				<React.Fragment>
					<LiquidatedStreamTable
						data={error ? [] : data.agreementLiquidatedV2Events}
					/>
					<LoadMoreBtnContainer>
						<Button
							text={loading ? 'Loading...' : 'Load more'}
							onClick={() =>
								!loading &&
								fetchMore({
									variables: {
										skip:
											data.agreementLiquidatedV2Events
												.length,
									},
								})
							}
						/>
					</LoadMoreBtnContainer>
				</React.Fragment>
			)}
		</LiquidatedStreamsContainer>
	);
}

export default LiquidatedStreams;
