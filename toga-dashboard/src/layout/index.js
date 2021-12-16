import React, { useContext, useState } from 'react';
import LiquidatedStreamsInfo from './LiquidatedStreamsInfo';
import withSelectedNetwork from '../components/HOC/withSelectedNetwork';
import { SectionContainer } from './commonElements';
import TokenInfoSection from './TokenInfoSection';
import {
	NetworkContext,
	ProviderOrSignerContext,
	SuperTokensContext,
} from '../components/context';
import { useQuery } from '@apollo/client';
import { GET_SUPER_TOKENS } from '../helper/graphQueries';
import PageLoader from '../components/Loader';
import styled from 'styled-components';
import { generateTokenMap } from '../helper/tokenUtils';
import { UNSUPPORTED } from '../constants/networks';

const PageLoaderContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function Layout() {
	const [tokenMap, setTokenMap] = useState(null);
	const [ethersProvider, setEthersProvider] = useState(null);
	const { selectedNetwork } = useContext(NetworkContext);
	const { loading } = useQuery(GET_SUPER_TOKENS, {
		onCompleted: (data) => {
			setTokenMap(generateTokenMap(data.tokens));
		},
		onError: () => setTokenMap(new Map()),
	});

	return (
		<SuperTokensContext.Provider value={tokenMap}>
			<ProviderOrSignerContext.Provider
				value={{ setEthersProvider, ethersProvider }}
			>
				{loading || !tokenMap ? (
					<PageLoaderContainer>
						<PageLoader />
					</PageLoaderContainer>
				) : (
					<React.Fragment>
						<TokenInfoSection />
						{selectedNetwork && selectedNetwork !== UNSUPPORTED ? (
							<SectionContainer>
								<LiquidatedStreamsInfo />
							</SectionContainer>
						) : null}
					</React.Fragment>
				)}
			</ProviderOrSignerContext.Provider>
		</SuperTokensContext.Provider>
	);
}

export default withSelectedNetwork(Layout);
