import { ThemeProvider } from 'styled-components';
import Layout from './layout';
import WagmiManager, { RainbowKitManager } from '../../components/wallet/WagmiManager';


const theme = {
	colors: {
		background: '#FCFDFE',
		info: '#FFF',
		accent: '#10BB34',
		lightAccent: 'rgba(16, 187, 52, 0.16)',
		negative: '#E74D39',
		border: '#E0E8F8',
		secondaryText: '#8292AD',
		text: '#000',
	},
	fonts: ['sans-serif', 'Montserrat'],
	fontSizes: {
		xsmall: '0.75rem',
		small: '1rem',
		medium: '1.5rem',
		mediumLarge: '2rem',
		large: '3rem',
	},
};
function App() {
	return (
		<div className="App">
			<WagmiManager>
				<RainbowKitManager>
					<ConnectButtonProvider>
						<ThemeProvider theme={theme}>
							<Layout />
						</ThemeProvider>
					</ConnectButtonProvider>
				</RainbowKitManager>
			</WagmiManager>
		</div>
	);
}

export default App;
