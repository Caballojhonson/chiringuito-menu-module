import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../Styles/muiTheme';
import NewItemForm from './NewItemForm';
import ItemListForm from './ItemListForm';
import NewProductHeader from './NewProductHeader';
import QuantityForm from './QuantityForm';
import { ReactCalculator } from 'simple-react-calculator';
import { IconButton, Modal } from '@mui/material';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import { Box } from '@mui/system';

export default function MainScreen() {
	const [newMenuItem, setNewMenuItem] = useState({});
	const [screen, setScreen] = useState(1);
	const [validate, setValidate] = useState(false);
	const [showCalculator, setShowCalculator] = useState(false);

	function handleState(obj) {
		setNewMenuItem({ ...newMenuItem, ...obj });
	}

	function removeItem(id) {
		const newItemsArray = newMenuItem.items.filter((item) => item._id !== id);
		const oldMenuItem = newMenuItem;
		oldMenuItem.items = newItemsArray;
		setNewMenuItem(oldMenuItem);
	}

	function addQuantity(quantity, id) {
		const matchingItemIndex = newMenuItem.items.findIndex(
			(item) => item._id === id
		);
		const oldState = newMenuItem;
		const item = oldState.items[matchingItemIndex];
		item.quantity = quantity;
		newMenuItem.items[matchingItemIndex] = item;
		setNewMenuItem(oldState);
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

	function CalculatorModal() {
		return (
			<Box>
				<Modal open={showCalculator} onClose={() => setShowCalculator(false)}>
					<Box sx={{backgroundColor: 'black'}}>
						<IconButton
							sx={{ position: 'fixed', left: '1rem', color: '#ffffff' }}
							onClick={() => setShowCalculator(false)}
							size="large"
							edge="start"
							color="inherit"
							aria-label="back"
						>
							<KeyboardBackspaceSharpIcon sx={{ fontSize: '2.7rem' }} />
						</IconButton>
						<ReactCalculator style={{ margin: '10rem' }} />
					</Box>
				</Modal>
			</Box>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<TopNavbar prev={prevScreen} showCalculator={() => setShowCalculator(true)}  />

			<CalculatorModal  />

			{screen === 1 && (
				<NewItemForm
					stateShare={handleState}
					validate={validate}
					newMenuItem={newMenuItem}
				/>
			)}
			{screen === 1 && (
				<ItemListForm
					newMenuItem={newMenuItem}
					stateShare={handleState}
					removeItem={removeItem}
					next={nextScreen}
					validate={validate}
				/>
			)}
			{screen === 2 && (
				<NewProductHeader newMenuItem={newMenuItem} prev={prevScreen} />
			)}
			{screen === 2 && (
				<QuantityForm newMenuItem={newMenuItem} addQuantity={addQuantity} />
			)}
		</ThemeProvider>
	);
}
