import React from 'react';
import TopNavbar from './TopNavbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { theme } from '../Styles/muiTheme';

export default function MainScreen() {
	

	return (
		<div>
			<ThemeProvider theme={theme}>
				<TopNavbar />
			</ThemeProvider>
		</div>
	);
}
