import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { NetworkContext } from '../context';
import NetworkSelectionModal from '../NetworkSelectionModal';
import WagmiManager, { RainbowKitManager } from '../wallet/WagmiManager';
import ConnectButtonProvider from '../wallet/ConnectButtonProvider';

function withSelectedNetwork(WrappedComponent) {
	return function NetworkSelectionWrapper(props) {
 		const [selectedNetwork, setSelectedNetwork] = useState(null);
		const [apolloClient, setApolloClient] = useState(null);

		useEffect(() => {
			if (!selectedNetwork || selectedNetwork.chainId === undefined) {
				return;
			}
			setApolloClient(
				new ApolloClient({
					link: createHttpLink({
						uri: selectedNetwork.subgraphUrl,
						fetch,
					}),

					cache: new InMemoryCache({
						typePolicies: {
							Query: {
								fields: {
									agreementLiquidatedV2Events: {
										keyArgs: [
											'where',
											[
												'liquidationType',
												'token_in',
											],
										],
										// Concatenate the incoming list items with
										// the existing list items.
										merge(existing = [], incoming) {
											return [...existing, ...incoming];
										},
									},
								},
							},
						},
					}),
				}),
			);
		}, [selectedNetwork]);

		if (apolloClient) {
			return (
				<NetworkContext.Provider
					value={{ selectedNetwork, setSelectedNetwork }}
				>
					<WagmiManager>
						<RainbowKitManager>
							<ConnectButtonProvider>
								<ApolloProvider client={apolloClient}>
									<WrappedComponent {...props} />
								</ApolloProvider>
							</ConnectButtonProvider>
						</RainbowKitManager>
					</WagmiManager>
				</NetworkContext.Provider>
			);
		}
		
		return (
			<NetworkSelectionModal
				enabled={!selectedNetwork}
				setSelectedNetwork={setSelectedNetwork}
			/>
		);
	};
}

export default withSelectedNetwork;
