import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { ProviderOrSignerContext, SelectedTokenContext } from '../context';
import LabelledInput from '../LabelledInput';
import PageLoader from '../Loader';
import { utils, Contract } from 'ethers';
import SuperTokenAbi from '../../contract-abi/SuperToken.json';
import {
	encodeToNaturalUnits,
	encodeToNaturalUnitsFromDaily,
} from '../../helper/tokenUtils';
import {
	FAILED,
	NO_TRANSACTION,
	SUCCESSFUL,
	WAITING,
} from '../../constants/txStatus';
import BigInfo from '../common/BigInfo';

const BecomePICModalContainer = styled.div`
	display: ${(props) => (props.enabled ? 'flex' : 'none')};
	flex-direction: column;
	position: absolute;
	right: 0;
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.info};
	padding: 30px 20px;
	row-gap: 20px;
	margin-top: 10px;

	@media screen and (max-width: 768px) {
		align-items: center;
		width: 100%;
	}
`;

const ControlsContainer = styled.div`
	display: flex;
	column-gap: 5px;
	justify-content: space-between;
	width: 100%;
`;

function BecomePICModal({ enabled, closeModal, togaContract, disableButton }) {
	const selectedToken = useContext(SelectedTokenContext);
	const { ethersProvider } = useContext(ProviderOrSignerContext);

	const [tokenContract, setTokenContract] = useState(null);
	const [exitRate, setExitRate] = useState(0);
	const [bond, setBond] = useState(0);
	const [txStatus, setTxStatus] = useState(NO_TRANSACTION);

	useEffect(() => {
		if (enabled) {
			// Workaround to stop the loading bubbles when user enables/disables modal
			setTxStatus(NO_TRANSACTION);
		}
	}, [enabled]);

	useEffect(() => {
		const tokenContractInterface = new utils.Interface(SuperTokenAbi);
		const contract = new Contract(
			selectedToken.id,
			tokenContractInterface,
			ethersProvider.getSigner(),
		);
		setTokenContract(contract);
	}, [ethersProvider, selectedToken]);

	async function sendPICBid() {
		try {
			setTxStatus(WAITING);
			disableButton(true);
			const tx = await tokenContract.send(
				togaContract.address,
				encodeToNaturalUnits(parseFloat(bond), selectedToken),
				encodeToNaturalUnitsFromDaily(
					parseFloat(exitRate),
					selectedToken,
				),
			);
			const receipt = await tx.wait();
			setTxStatus(receipt.status ? SUCCESSFUL : FAILED);
		} catch (e) {
			console.log('Unabled to become bic', e);
			setTxStatus(FAILED);
		}
		disableButton(false);

		setTimeout(() => {
			setTxStatus(NO_TRANSACTION);
			closeModal();
		}, 3000);
	}

	let content;
	if (txStatus === WAITING || !tokenContract) {
		content = <PageLoader />;
	} else if (txStatus === NO_TRANSACTION) {
		content = (
			<React.Fragment>
				<LabelledInput
					label={`Exit Rate (${selectedToken.symbol}/day)`}
					value={exitRate}
					onChange={(e) => setExitRate(e.target.value)}
				/>
				<LabelledInput
					label={`Bond (${selectedToken.symbol})`}
					value={bond}
					onChange={(e) => setBond(e.target.value)}
				/>
				<ControlsContainer>
					<Button text={'Confirm'} onClick={sendPICBid} />
					<Button
						onClick={closeModal}
						negative={true}
						text={'Cancel'}
					/>
				</ControlsContainer>
			</React.Fragment>
		);
	} else if (txStatus === SUCCESSFUL) {
		content = <BigInfo text={'You are now the PIC!'} />;
	} else if (txStatus === FAILED) {
		content = <BigInfo text={'PIC bid failed'} />;
	}

	return (
		<BecomePICModalContainer enabled={enabled}>
			{content}
		</BecomePICModalContainer>
	);
}

export default BecomePICModal;
