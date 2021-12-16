import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	NetworkContext,
	ProviderOrSignerContext,
	SelectedTokenContext,
} from '../context';
import InfoBox from '../InfoBox';
import { InfoBoxesContainer } from '../InfoBox/commonElements';
import { utils, Contract } from 'ethers';
import TOGAContractABI from '../../contract-abi/TOGA.json';
import BigInfo from '../common/BigInfo';
import {
	abbreviateAddress,
	naturalUnitToReadable,
	naturalUnitToDailyReadable,
} from '../../helper/tokenUtils';
import PICInteract from './PICInteract';
import { isWalletConnected } from '../../helper/web3Utils';
import CopyableAddress from '../common/CopyableAddress';

const PICInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const PICHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 50px;
	@media screen and (max-width: 768px) {
		flex-direction: column;
		row-gap: 15px;
	}
`;

const PICInfoTitle = styled.div`
	font-size: ${(props) => props.theme.fontSizes.mediumLarge};

	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

function PICInfo() {
	const { selectedNetwork } = useContext(NetworkContext);
	const selectedToken = useContext(SelectedTokenContext);
	const [loadingPICData, setLoadingPICData] = useState(false);
	const [picData, setPicData] = useState({});
	const [allowPICInteraction, setAllowPICInteraction] = useState(false);
	const [togaContract, setTogaContract] = useState(null);
	const { ethersProvider } = useContext(ProviderOrSignerContext);

	useEffect(() => {
		if (!ethersProvider || !selectedNetwork) {
			return;
		}
		setAllowPICInteraction(isWalletConnected(ethersProvider));
		if (!selectedNetwork.togaAddress) {
			return;
		}
		const togaContractInterface = new utils.Interface(TOGAContractABI);
		const providerOrSigner = isWalletConnected(ethersProvider)
			? ethersProvider.getSigner()
			: ethersProvider;
		const contract = new Contract(
			selectedNetwork.togaAddress,
			togaContractInterface,
			providerOrSigner,
		);
		setTogaContract(contract);
	}, [ethersProvider, selectedNetwork]);

	useEffect(() => {
		if (!togaContract || !selectedToken) {
			return;
		}
		const refreshTogaInfo = async () => {
			setLoadingPICData(true);
			try {
				const {
					pic,
					exitRate,
					bond,
				} = await togaContract.getCurrentPICInfo(selectedToken.id);
				setPicData({ address: pic, exitRate, bond });
			} catch (e) {}

			setLoadingPICData(false);
		};
		refreshTogaInfo();
	}, [togaContract, selectedToken]);

	useEffect(() => {
		if (!togaContract || !selectedToken) {
			return;
		}
		const picChange = (token, pic, bond, exitRate) => {
			if (token.toLowerCase() === selectedToken.id.toLowerCase()) {
				setPicData({ address: pic, exitRate, bond });
			}
		};
		const exitRateChange = (token, exitRate) => {
			if (token.toLowerCase() === selectedToken.id.toLowerCase()) {
				setPicData({ ...picData, exitRate });
			}
		};
		togaContract.on('NewPIC', picChange);
		togaContract.on('ExitRateChanged', exitRateChange);
		return () => {
			togaContract.off('NewPIC', picChange);
			togaContract.off('ExitRateChanged', exitRateChange);
		};
	}, [togaContract, selectedToken, picData]);

	return (
		<PICInfoContainer>
			<PICHeader>
				<PICInfoTitle>PIC Info</PICInfoTitle>
				<PICInteract
					enabled={allowPICInteraction}
					picAddress={picData.address}
					togaContract={togaContract}
				/>
			</PICHeader>
			{ethersProvider ? (
				<InfoBoxesContainer>
					<InfoBox
						title={'Address'}
						secondaryInfo={"Current PIC's wallet address"}
						data={
							picData.address ? (
								<CopyableAddress
									toDisplay={abbreviateAddress(
										picData.address,
									)}
									address={picData.address}
								/>
							) : (
								'No info'
							)
						}
						loading={loadingPICData}
					/>
					<InfoBox
						title={'Bond'}
						secondaryInfo={'Bond for the current PIC'}
						data={
							picData.bond
								? `${naturalUnitToReadable(
										picData.bond,
										selectedToken,
								  )}`
								: 'No info'
						}
						loading={loadingPICData}
					/>
					<InfoBox
						title={'Exit rate'}
						secondaryInfo={'Exit rate per day for the current PIC'}
						data={
							picData.exitRate
								? `${naturalUnitToDailyReadable(
										picData.exitRate,
										selectedToken,
								  )}`
								: 'No info'
						}
						loading={loadingPICData}
					/>
				</InfoBoxesContainer>
			) : (
				<BigInfo text={'Connect your wallet to see PIC info'} />
			)}
		</PICInfoContainer>
	);
}

export default PICInfo;
