import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../Styles/muiTheme';
import NewItemForm from './NewItemForm';
import ItemListForm from './ItemListForm';
import NewProductHeader from './NewProductHeader';
import QuantityForm from './QuantityForm';

export default function MainScreen() {
	const [newMenuItem, setNewMenuItem] = useState({});
	const [screen, setScreen] = useState(1);
	const [validate, setValidate] = useState(false);

	function handleState(obj) {
		setNewMenuItem({ ...newMenuItem, ...obj });
	}

	function addQuantity(quantity, id){
		const matchingItemIndex = newMenuItem.items.findIndex(item => item._id === id)
		const oldState = newMenuItem
		const item = oldState.items[matchingItemIndex]
		item.quantity = quantity
		newMenuItem.items[matchingItemIndex] = item
		setNewMenuItem(oldState)
	}

	function nextScreen() {
		if (
			newMenuItem.name &&
			newMenuItem.rationNumber &&
			newMenuItem.category &&
			newMenuItem.items
		) {
			setScreen(2);
		} else setValidate(true);
	}

	function prevScreen() {
		setScreen(1);
	}

	return (
		<ThemeProvider theme={theme}>
			<TopNavbar prev={prevScreen} />

			{screen === 1 && (
				<NewItemForm stateShare={handleState} validate={validate} newMenuItem={newMenuItem} />
			)}
			{screen === 1 && (
				<ItemListForm
					newMenuItem={newMenuItem}
					stateShare={handleState}
					next={nextScreen}
					validate={validate}
				/>
			)}
			{screen === 2 && (
				<NewProductHeader
					newMenuItem={newMenuItem}
					prev={prevScreen}
				/>
			)}
			{screen === 2 && (
				<QuantityForm newMenuItem={newMenuItem} addQuantity={addQuantity} />
			)}
		</ThemeProvider>
	);
}
