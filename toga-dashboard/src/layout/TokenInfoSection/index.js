import React, { useContext, useState } from 'react';
import { HeaderContainer, SectionContainer } from '../commonElements';
import Header from '../Controls';
import TokenInfo from '../../components/TokenInfo';
import PICInfo from '../../components/PICInfo';
import {
	SelectedTokenContext,
	SuperTokensContext,
} from '../../components/context';
import BigInfo from '../../components/common/BigInfo';
import SectionHeader from '../../components/common/SectionHeader';
import TokenSelection from '../../components/TokenSelection';

function TokenInfoSection() {
	const [selectedToken, setSelectedToken] = useState(null);
	const tokenMap = useContext(SuperTokensContext);

	return (
		<SelectedTokenContext.Provider value={selectedToken}>
			<SectionContainer>
				<Header setSelectedToken={setSelectedToken} />
			</SectionContainer>
			<HeaderContainer>
				<SectionHeader
					text={`Token information ${
						selectedToken ? `(${selectedToken.symbol})` : ''
					}`}
				/>
				<TokenSelection setSelectedToken={setSelectedToken} />
			</HeaderContainer>

			{selectedToken ? (
				<React.Fragment>
					<SectionContainer>
						<TokenInfo />
					</SectionContainer>
					<SectionContainer>
						<PICInfo />
					</SectionContainer>
				</React.Fragment>
			) : (
				<SectionContainer>
					<BigInfo
						text={
							tokenMap.size > 0
								? 'Select a token...'
								: 'No tokens available'
						}
					/>
				</SectionContainer>
			)}
		</SelectedTokenContext.Provider>
	);
}

export default TokenInfoSection;
