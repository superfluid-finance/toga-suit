import React, { useContext, useState } from 'react';
import Button from '../Button';
import {
	FilterContainer,
	FilterToggle,
	FilterFieldsContainer,
	ButtonContainer,
} from './filterElements';
import { SuperTokensContext } from '../context/index.js';
import { PIRATE, REGULAR } from '../../constants/liquidationType.js';
import DropdownSelection from '../common/DropdownSelection.js';

function Filter({
	applyFilter,
	setSelectedTokenIds,
	setLiqTypes,
}) {
	const [filterExpanded, setFilterExpanded] = useState(false);
	const tokenMap = useContext(SuperTokensContext);
	return (
		<FilterContainer>
			<FilterToggle>
				<Button
					text={filterExpanded ? 'Close filters' : 'More filters'}
					onClick={() => setFilterExpanded(!filterExpanded)}
				/>
			</FilterToggle>
			<FilterFieldsContainer filterExpanded={filterExpanded}>
				<DropdownSelection
					placeholder=""
					label="Token"
					options={[...tokenMap.values()].map((t) => ({
						value: t.id,
						label: t.readable,
					}))}
					onChange={(opts) => {
						setSelectedTokenIds(opts.map((o) => o.value));
					}}
					isMulti={true}
				/>

				<DropdownSelection
					placeholder=""
					label="Liquidation Type"
					options={[PIRATE, REGULAR].map((t) => ({
						value: t.value,
						label: t.emoji,
					}))}
					onChange={(opts) => {
						setLiqTypes(opts.map((o) => o.value));
					}}
					isMulti={true}
				/>
				<ButtonContainer>
					<Button text={'Filter'} onClick={applyFilter} />
				</ButtonContainer>
			</FilterFieldsContainer>
		</FilterContainer>
	);
}

export default Filter;
