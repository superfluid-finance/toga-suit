import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { NetworkContext } from '../context';
import NetworkSelectionModal from '../NetworkSelectionModal';


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
						uri: selectedNetwork.subgraphV1.hostedEndpoint,
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
		let content;

		if (apolloClient) {
			content = (
				<NetworkContext.Provider
					value={{ selectedNetwork, setSelectedNetwork }}
				>
					<ApolloProvider client={apolloClient}>
						<WrappedComponent {...props} />
					</ApolloProvider>
				</NetworkContext.Provider>
			);
		} else {
			content = (
				<NetworkSelectionModal
					enabled={!selectedNetwork}
					setSelectedNetwork={setSelectedNetwork}
				/>
			);
		}

		return content;
	};
}

export default withSelectedNetwork;
