import styled from 'styled-components';

export const Table = styled.table`
	table-layout: fixed;
	width: 100%;
	border-spacing: 0;
	border: 1px solid ${(props) => props.theme.colors.border};
`;

export const TableHeader = styled.thead`
	background-color: ${(props) => props.theme.colors.background};
`;

export const TableBody = styled.tbody`
	background-color: ${(props) => props.theme.colors.info};
`;

export const ColumnHeader = styled.th`
	color: ${(props) => props.theme.colors.secondaryText};
	border-right: 1px solid ${(props) => props.theme.colors.border};
	border-bottom: 1px solid ${(props) => props.theme.colors.border};
	margin: 0;
	padding: 0px 10px;
	text-align: left;
	font-weight: 400;

	&:last-child {
		border-right: 0;
	}

	@media screen and (max-width: 768px) {
		font-size: ${(props) => props.theme.fontSizes.xsmall};
	}
`;

export const Row = styled.tr`
	height: 48px;
`;

export const Cell = styled.td`
	color: ${(props) => props.theme.colors.text};
	border-bottom: 1px solid ${(props) => props.theme.colors.border};
	border-right: 1px solid ${(props) => props.theme.colors.border};
	margin: 0;
	padding: 0px 10px;
	text-align: left;
	font-size: ${(props) => props.theme.fontSizes.small};

	&:last-child {
		border-right: 0;
	}

	@media screen and (max-width: 768px) {
		font-size: ${(props) => props.theme.fontSizes.xsmall};
	}
`;

export const RowExtensionContent = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding: 40px;
	box-shadow: inset 0 0 4px ${(props) => props.theme.colors.border};
	background-color: ${(props) => props.theme.colors.background};

	@media screen and (max-width: 768px) {
		flex-direction: column;
		row-gap: 20px;
	}
`;

export const ExtensionInfo = styled.div`
	display: flex;
	align-items: flex-end;
	color: ${(props) => props.theme.colors.secondaryText};
	& svg {
		height: 100%;
		width: auto;
	}

	@media screen and (max-width: 768px) {
		font-size: ${(props) => props.theme.fontSizes.xsmall};
	}
`;

export const RowExtensionColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	row-gap: 20px;
`;

export const ExpandArrowContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	& svg {
		transform: ${(props) => (props.rowExpanded ? '' : 'rotate(180deg)')};
	}
`;

export const TxLinkContainer = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-decoration: none;
`;

export const RowExtensionContainer = styled.td`
	padding: 0;
`;
