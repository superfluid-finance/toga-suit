import React from 'react';
import styled from 'styled-components';

const BigInfoContainer = styled.div`
	font-size: ${(props) => props.theme.fontSizes.mediumLarge};
	color: ${(props) => props.theme.colors.secondaryText};
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

function BigInfo({ text }) {
	return <BigInfoContainer>{text}</BigInfoContainer>;
}

export default BigInfo;
