import styled from 'styled-components';

export const InfoBoxContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 100%;
	border: 1px solid ${(props) => props.theme.colors.border};
	border-radius: 4px;
	background-color: ${(props) => props.theme.colors.info};
	padding: 30px 20px;

	@media screen and (max-width: 768px) {
		align-items: center;
	}
`;

export const InfoBoxesContainer = styled.div`
	display: flex;
	width: 100%;

	@media screen and (min-width: 768px) {
		& ${InfoBoxContainer} {
			margin-right: 50px;
		}

		& ${InfoBoxContainer}:last-child {
			margin-right: 0px;
		}
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;

		& ${InfoBoxContainer} {
			margin-top: 30px;
		}
	}
`;
