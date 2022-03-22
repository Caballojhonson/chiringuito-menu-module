import React from 'react';
import TopNavbar from './TopNavbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../Styles/muiTheme';
import NewItemForm from './NewItemForm';

export default function MainScreen() {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<TopNavbar />
				<NewItemForm />
			</ThemeProvider>
		</div>
	);
}
