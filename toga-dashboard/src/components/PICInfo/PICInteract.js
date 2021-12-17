import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { isWalletConnected } from '../../helper/web3Utils';
import BecomePICModal from '../BecomePICModal';
import Button from '../Button';
import { ProviderOrSignerContext } from '../context';
import ExitRateModal from '../ExitRateModal';

const InteractivePIC = styled.div`
	position: relative;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

function PICInteract({ picAddress, togaContract, enabled }) {
	const [modalToggled, toggleModal] = useState(false);
	const [isPIC, setIsPIC] = useState(false);
	const { ethersProvider } = useContext(ProviderOrSignerContext);
	const [buttonDisabled, disableButton] = useState(false);
	
	useEffect(() => {
		if (!picAddress || !isWalletConnected(ethersProvider)) {
			setIsPIC(false);
			return;
		}
		const checkPIC = async () => {
			try {
				const connectedWalletAddress = await ethersProvider
					.getSigner()
					.getAddress();

				setIsPIC(
					connectedWalletAddress &&
						connectedWalletAddress.toLowerCase() ===
							picAddress.toLowerCase(),
				);
			} catch (e) {
				setIsPIC(false);
			}
		};
		checkPIC();
	}, [ethersProvider, picAddress]);

	return enabled ? (
		<InteractivePIC>
			{isPIC && (
				<Button
				text={isPIC ? 'Change exit rate' : 'Become PIC'}
				onClick={() => toggleModal(!modalToggled)}
				disabled={buttonDisabled}
			/>)}
			{isPIC ? (
				<ExitRateModal
					enabled={modalToggled}
					togaContract={togaContract}
					disableButton={disableButton}
					closeModal={() => toggleModal(false)}
				/>
			) : (
				<BecomePICModal
					enabled={modalToggled}
					togaContract={togaContract}
					disableButton={disableButton}
					closeModal={() => toggleModal(false)}
				/>
			)}
		</InteractivePIC>
	) : null;
}

export default PICInteract;
