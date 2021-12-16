import React from 'react';
import styled from 'styled-components';

const SectionHeaderContainer = styled.div`
	font-size: ${(props) => props.theme.fontSizes.large};
	display: flex;
	align-items: center;
	@media screen and (max-width: 768px) {
		text-align: center;
	}
`;

function SectionHeader({ text }) {
	return <SectionHeaderContainer>{text}</SectionHeaderContainer>;
}

export default SectionHeader;
