import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.div`
	font-size: ${(props) => props.theme.fontSizes.small};
	color: ${(props) => props.theme.colors.secondaryText};
`;
const Input = styled.input`
	height: 48px;
	font-size: ${(props) => props.theme.fontSizes.small};
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: 4px;
	&:focus {
		outline: none;
		border: 1px solid ${(props) => props.theme.colors.accent};
	}
`;

function LabelledInput({ label, value, onChange, onClick }) {
	return (
		<InputContainer>
			<Label>{label}</Label>
			<Input onChange={onChange} value={value} onClick={onClick}></Input>
		</InputContainer>
	);
}

export default LabelledInput;
