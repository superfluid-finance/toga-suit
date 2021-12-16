import styled from 'styled-components';

export const SectionContainer = styled.div`
	max-width: 1400px;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	padding: 40px 60px;
	height: auto;
	background-color: ${(props) => props.theme.colors.background};
	width: 100vw;

	@media screen and (max-width: 768px) {
		padding: 30px;
	}
`;

export const HeaderContainer = styled.div`
	max-width: 1400px;
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	margin: 0 auto;
	padding: 40px 60px;
	height: auto;
	background-color: ${(props) => props.theme.colors.background};
	width: 100vw;

	@media screen and (max-width: 768px) {
		padding: 30px;
	}
`;
