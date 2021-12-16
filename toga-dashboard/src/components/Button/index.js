import React from 'react';
import styled from 'styled-components';

export const StyledButton = styled.a`
	display: flex;
	height: 48px;
	border-radius: 4px;
	background: ${(props) =>
		props.disabled
			? props.theme.colors.lightAccent
			: props.negative
			? props.theme.colors.negative
			: props.theme.colors.accent};
	padding: 10px 22px;
	color: ${(props) =>
		props.disabled
			? props.theme.colors.secondaryText
			: props.theme.colors.info};
	border: 1px solid ${(props) => props.theme.colors.border};
	outline: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-size: ${(props) => props.theme.fontSizes.small};
	font-weight: 700;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
const Button = ({ text, disabled, onClick, negative = false }) => {
	return (
		<StyledButton
			disabled={disabled}
			onClick={() => !disabled && onClick()}
			negative={negative}
		>
			{text}
		</StyledButton>
	);
};

export default Button;
