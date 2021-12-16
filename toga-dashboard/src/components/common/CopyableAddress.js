import React from 'react';
import { ReactComponent as CopyContent } from '../images/copyContent.svg';

import styled from 'styled-components';

const CopyIcon = styled(CopyContent)`
	margin: 0px 10px;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.colors.lightAccent};
	}
	&:active {
		background-color: ${(props) => props.theme.colors.accent};
	}
`;

function CopyableAddress({ toDisplay, address }) {
	return (
		<React.Fragment>
			{toDisplay}
			<CopyIcon
				onClick={() =>
					navigator &&
					navigator.clipboard &&
					navigator.clipboard.writeText(address)
				}
			/>
		</React.Fragment>
	);
}

export default CopyableAddress;
