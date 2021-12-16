import React, { useContext } from 'react';
import styled from 'styled-components';
import BigInfo from '../../components/common/BigInfo';
import ConnectWalletButton from '../../components/ConnectWalletButton';
import { NetworkContext } from '../../components/context';
import { ReactComponent as Logo } from '../../components/images/logo.svg';

const ControlsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 10px;
	width: 100%;
	align-items: center;

	@media screen and (max-width: 768px) {
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(1, 1fr);
		row-gap: 10px;
	}
`;
const ConnectControlContainer = styled.div`
	justify-self: end;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

function Header() {
	const { selectedNetwork } = useContext(NetworkContext);
	return (
		<ControlsContainer>
			<Logo />
			<BigInfo text={selectedNetwork.name} />
			<ConnectControlContainer>
				<ConnectWalletButton />
			</ConnectControlContainer>
		</ControlsContainer>
	);
}

export default Header;
