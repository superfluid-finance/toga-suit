import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Label = styled.div`
	font-size: ${(props) => props.theme.fontSizes.small};
	color: ${(props) => props.theme.colors.secondaryText};
`;

const Selection = styled(Select)`
	& .react-select__control {
		display: flex;
		width: 100%;
		cursor: pointer;
		align-items: center;
		border: 1px solid ${(props) => props.theme.colors.border};
		border-radius: 4px;
		background-color: ${(props) => props.theme.colors.info};
		padding: 5px;
		box-shadow: none;
		border-color: ${(props) => props.theme.colors.border};

		@media screen and (max-width: 768px) {
			width: 100%;
		}
		&:hover {
			border-color: ${(props) => props.theme.colors.accent};
		}
	}
	& .react-select__control--is-focused {
		border-color: ${(props) => props.theme.colors.accent};
	}

	& .react-select__indicator-separator {
		display: none;
	}

	& .react-select__menu {
		box-shadow: unset;
		z-index: 20;
	}

	& .react-select__option {
		&:hover {
			background-color: ${(props) => props.theme.colors.lightAccent};
		}
	}

	& .react-select__option--is-focused {
		background-color: ${(props) => props.theme.colors.lightAccent};
	}

	& .react-select__multi-value {
		background-color: ${(props) => props.theme.colors.lightAccent};
	}

	& .react-select__option--is-selected {
		background-color: ${(props) => props.theme.colors.accent};

		&:hover {
			background-color: ${(props) => props.theme.colors.accent};
		}
	}

	& .react-select__menu-list {
		@media screen and (max-width: 768px) {
			width: 100%;
		}

		border: 1px solid ${(props) => props.theme.colors.border};
		border-radius: 4px;

		overflow-y: auto;

		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
			background-color: ${(props) => props.theme.colors.accent};
		}

		&::-webkit-scrollbar {
			width: 12px;
			background-color: ${(props) => props.theme.colors.background};
		}

		&::-webkit-scrollbar-track {
			border-radius: 10px;
			background-color: ${(props) => props.theme.colors.background};
		}
	}
`;

function DropdownSelection({
	options,
	onChange,
	placeholder,
	label,
	isMulti = false,
}) {
	return (
		<div>
			<Label>{label}</Label>

			<Selection
				classNamePrefix="react-select"
				placeholder={placeholder}
				options={options}
				onChange={onChange}
				isMulti={isMulti}
			/>
		</div>
	);
}

export default DropdownSelection;
