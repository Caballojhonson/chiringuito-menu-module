import React, {useState} from 'react';
import TopNavbar from './TopNavbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../Styles/muiTheme';
import NewItemForm from './NewItemForm';
import ItemListForm from './ItemListForm';

export default function MainScreen() {
	const [newMenuItem, setNewMenuItem] = useState({})

	function handleState(obj) {
		setNewMenuItem({ ...newMenuItem, ...obj })
	}

	return (
		<div>
			<ThemeProvider theme={theme}>
				<TopNavbar />
				<NewItemForm stateShare={handleState} />
				<ItemListForm stateShare={handleState} /> 
			</ThemeProvider>
		</div>
	);
}
