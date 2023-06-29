import React, { useContext, useState } from 'react';
import LiquidatedStreamsInfo from './LiquidatedStreamsInfo';
import withSelectedNetwork from '../components/HOC/withSelectedNetwork';
import { SectionContainer } from './commonElements';
import TokenInfoSection from './TokenInfoSection';
import {
	JsonRpcProvider,
	NetworkContext,
	SignerContext,
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
	const [signer, setSigner] = useState(null);
	const [jsonRPCProvider, setJsonRPCProvider] = useState(null);

	const { selectedNetwork } = useContext(NetworkContext);
	const { loading } = useQuery(GET_SUPER_TOKENS, {
		onCompleted: (data) => {
			setTokenMap(generateTokenMap(data.tokens));
		},
		onError: () => setTokenMap(new Map()),
	});

	return (
		<SuperTokensContext.Provider value={tokenMap}>
			<JsonRpcProvider.Provider
				value={{ setJsonRPCProvider, jsonRPCProvider }}
			>
				<SignerContext.Provider value={{ setSigner, signer }}>
					{loading || !tokenMap ? (
						<PageLoaderContainer>
							<PageLoader />
						</PageLoaderContainer>
					) : (
						<React.Fragment>
							<TokenInfoSection />
							{selectedNetwork &&
							selectedNetwork !== UNSUPPORTED ? (
								<SectionContainer>
									<LiquidatedStreamsInfo />
								</SectionContainer>
							) : null}
						</React.Fragment>
					)}
				</SignerContext.Provider>
			</JsonRpcProvider.Provider>
		</SuperTokensContext.Provider>
	);
}

export default withSelectedNetwork(Layout);
