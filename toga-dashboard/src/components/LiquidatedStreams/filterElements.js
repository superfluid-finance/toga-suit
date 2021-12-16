import styled from 'styled-components';

export const FilterFieldsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 15px;

	@media screen and (max-width: 768px) {
		display: ${(props) => (props.filterExpanded ? 'grid' : 'none')};
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(1, 1fr);
		row-gap: 10px;
		flex-direction: column;
	}
`;

export const FilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 30px;
`;

export const ButtonContainer = styled.div`
	align-self: end;
`;

export const FilterToggle = styled.div`
	display: none;

	@media screen and (max-width: 768px) {
		display: block;
	}
`;
