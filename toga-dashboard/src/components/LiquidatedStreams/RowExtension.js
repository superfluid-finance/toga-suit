import React from 'react';
import { abbreviateAddress } from '../../helper/tokenUtils';
import {
	RowExtensionContent,
	RowExtensionColumn,
	ExtensionInfo,
	RowExtensionContainer,
} from './tableElements';
import { ReactComponent as LinkIcon } from '../images/linkIcon.svg';

function RowExtension({ row, colSpan }) {
	return (
		<tr>
			<RowExtensionContainer colSpan={colSpan}>
				<RowExtensionContent>
					<RowExtensionColumn>
						<ExtensionInfo>
							REWARD ADDRESS
							<span>
								{abbreviateAddress(
									row.original.liquidatorAccount,
								)}
							</span>
						</ExtensionInfo>
						<ExtensionInfo>
							REWARD AMOUNT
							<span>{row.original.rewardAmount}</span>
						</ExtensionInfo>
					</RowExtensionColumn>
					<RowExtensionColumn>
						<ExtensionInfo>
							BAILOUT ADDRESS
							<span>
								{abbreviateAddress(row.original.penaltyAccount)}
							</span>
						</ExtensionInfo>
						<ExtensionInfo>
							BAILOUT AMOUNT
							<span>{row.original.bailoutAmount}</span>
						</ExtensionInfo>
					</RowExtensionColumn>
					<RowExtensionColumn>
						<ExtensionInfo>
							TX
							<span>
								<LinkIcon />
							</span>
						</ExtensionInfo>
					</RowExtensionColumn>
				</RowExtensionContent>
			</RowExtensionContainer>
		</tr>
	);
}

export default RowExtension;
