import React, { useContext } from 'react';
import styled from 'styled-components';
import { SuperTokensContext } from '../context';
import DropdownSelection from '../common/DropdownSelection';

const TokenSelectionContainer = styled.div`
	position: relative;
	width: 218px;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

function TokenSelection({ setSelectedToken }) {
	const tokenMap = useContext(SuperTokensContext);

	return (
		<TokenSelectionContainer>
			<DropdownSelection
				placeholder="Select a token..."
				options={[...tokenMap.values()]
					.sort((a, b) => (b.isListed ? 1 : -1) - (a.isListed ? 1 : -1))
					.map((t) => ({
					value: t.id,
					label: t.readable,
				}))}
				onChange={(opt) => {
					setSelectedToken(tokenMap.get(opt.value));
				}}
			/>
		</TokenSelectionContainer>
	);
}

export default TokenSelection;

/**
 * 			<DropdownContainer
				onClick={() => setDropdownActive(!dropdownActive)}
			>
				<React.Fragment>
					<DropdownText>
						{selectedToken
							? selectedToken.readable
							: 'Select your token...'}
					</DropdownText>
					<DropdownIndicator dropdownActive={dropdownActive}>
						<DropdownArrow />
					</DropdownIndicator>
				</React.Fragment>
			</DropdownContainer>
 * 
 */
