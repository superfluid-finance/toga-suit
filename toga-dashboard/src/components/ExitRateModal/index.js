import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	FAILED,
	NO_TRANSACTION,
	SUCCESSFUL,
	WAITING,
} from '../../constants/txStatus';
import {
	encodeToNaturalUnitsFromDaily,
} from '../../helper/tokenUtils';
import Button from '../Button';
import BigInfo from '../common/BigInfo';
import { SelectedTokenContext } from '../context';
import LabelledInput from '../LabelledInput';
import PageLoader from '../Loader';

const ExitRateModalContainer = styled.div`
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

function ExitRateModal({ enabled, closeModal, togaContract, disableButton }) {
	const selectedToken = useContext(SelectedTokenContext);

	const [exitRate, setExitRate] = useState(0);
	const [txStatus, setTxStatus] = useState(NO_TRANSACTION);

	useEffect(() => {
		if (enabled) {
			// Workaround to stop the loading bubbles when user enables/disables modal
			setTxStatus(NO_TRANSACTION);
		}
	}, [enabled]);

	async function changeExitRate() {
		try {
			setTxStatus(WAITING);
			disableButton(true);
			const tx = await togaContract.changeExitRate(
				selectedToken.id,
				encodeToNaturalUnitsFromDaily(
					parseFloat(exitRate),
					selectedToken,
				),
			);
			const receipt = await tx.wait();
			setTxStatus(receipt.status ? SUCCESSFUL : FAILED);
		} catch (e) {
			console.log('Unable to change exit rate', e);
			setTxStatus(FAILED);
		}
		disableButton(false);

		setTimeout(() => {
			setTxStatus(NO_TRANSACTION);
			closeModal();
		}, 3000);
	}

	let content;
	if (txStatus === WAITING) {
		content = <PageLoader />;
	} else if (txStatus === NO_TRANSACTION) {
		content = (
			<React.Fragment>
				<LabelledInput
					label={`New Exit Rate (${selectedToken.symbol}/day)`}
					value={exitRate}
					onChange={(e) => setExitRate(e.target.value)}
				/>
				<ControlsContainer>
					<Button text={'Confirm'} onClick={changeExitRate} />
					<Button
						onClick={closeModal}
						negative={true}
						text={'Cancel'}
					/>
				</ControlsContainer>
			</React.Fragment>
		);
	} else if (txStatus === SUCCESSFUL) {
		content = <BigInfo text={'Exit rate changed successfully'} />;
	} else if (txStatus === FAILED) {
		content = <BigInfo text={'Exit rate change failed'} />;
	}

	return (
		<ExitRateModalContainer enabled={enabled}>
			{content}
		</ExitRateModalContainer>
	);
}

export default ExitRateModal;
