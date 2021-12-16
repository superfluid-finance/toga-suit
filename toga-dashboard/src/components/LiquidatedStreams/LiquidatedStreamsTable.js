import React, { useContext, useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import {
	Table,
	TableHeader,
	ColumnHeader,
	TableBody,
	Row,
	Cell,
	//ExpandArrowContainer,
	ExtensionInfo,
	TxLinkContainer,
} from './tableElements';
//import { ReactComponent as ExpandRowArrow } from '../images/greenArrow.svg';
import { naturalUnitToReadable } from '../../helper/tokenUtils';
import { NetworkContext, SuperTokensContext } from '../context';
import styled from 'styled-components';
import { PIRATE, REGULAR } from '../../constants/liquidationType';
import { ReactComponent as LinkIcon } from '../images/linkIcon.svg';
import CopyableAddress from '../common/CopyableAddress';

const TypeContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

function LiquidatedStreamTable({ data }) {
	const tokenMap = useContext(SuperTokensContext);
	const { selectedNetwork } = useContext(NetworkContext);
	const columns = useMemo(
		() => [
			{
				accessor: 'bailoutAmount',
				Cell: ({ value }) => (
					<TypeContainer>
						{value > 0 ? PIRATE.emoji : REGULAR.emoji}
					</TypeContainer>
				),
			},
			{
				Header: 'Token',
				accessor: 'token',
				Cell: ({ value }) => {
					const token = tokenMap.get(value);
					if (!token || !token.readable) {
						return value;
					}
					return (
						<CopyableAddress
							toDisplay={token.readable}
							address={token.id}
						/>
					);
				},
			},
			{
				Header: 'Timestamp',
				accessor: 'timestamp',
				Cell: ({ value }) => {
					try {
						return new Date(value * 1000).toLocaleString();
					} catch (_) {
						// Safety
						return value;
					}
				},
			},
			{
				Header: 'Reward Amount',
				accessor: 'rewardAmount',
				Cell: ({
					value,
					row: {
						values: { token },
					},
				}) => {
					return naturalUnitToReadable(value, tokenMap.get(token));
				},
			},
			//{
			//	id: 'expander', // react-table needs an ID
			//	Cell: ({ row }) => (
			//		<ExpandArrowContainer rowExpanded={row.isExpanded}>
			//			<ExpandRowArrow />
			//		</ExpandArrowContainer>
			//	),
			//},
			{
				id: 'txLink', // react-table needs an ID
				accessor: 'transactionHash',
				Cell: ({ value }) => {
					return (
						<TxLinkContainer
							href={selectedNetwork.getTxLink(value)}
							target="_blank"
						>
							<ExtensionInfo>
								<LinkIcon />
							</ExtensionInfo>
						</TxLinkContainer>
					);
				},
			},
		],
		[tokenMap, selectedNetwork],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		//visibleColumns,
	} = useTable({ columns, data }, useExpanded);

	return (
		<Table {...getTableProps()}>
			<colgroup>
				<col style={{ width: '10%' }} />
				<col style={{ width: '20%' }} />
				<col style={{ width: '20%' }} />
				<col style={{ width: '20%' }} />
				<col style={{ width: '10%' }} />
			</colgroup>
			<TableHeader>
				{headerGroups.map((headerGroup) => (
					<Row {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<ColumnHeader {...column.getHeaderProps()}>
								{column.render('Header')}
							</ColumnHeader>
						))}
					</Row>
				))}
			</TableHeader>
			<TableBody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<React.Fragment key={row.getRowProps().key}>
							<Row>
								{/*{...row.getToggleRowExpandedProps()}>*/}
								{row.cells.map((cell) => {
									return (
										<Cell {...cell.getCellProps()}>
											{cell.render('Cell')}
										</Cell>
									);
								})}
							</Row>

							{/*{row.isExpanded ? (
								<RowExtension
									colSpan={visibleColumns.length}
									row={row}
								/>
							) : null}*/}
						</React.Fragment>
					);
				})}
			</TableBody>
		</Table>
	);
}

export default LiquidatedStreamTable;
