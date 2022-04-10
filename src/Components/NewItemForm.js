import React, { useState } from 'react';
import {
	TextField,
	Typography,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	ToggleButtonGroup,
	ToggleButton,
	FormControlLabel,
	Switch

} from '@mui/material';
import { Box } from '@mui/system';

export default function NewItemForm(props) {
	const [newItem, setNewItem] = useState(props.newMenuItem || {
		isIntermediate: false,
		timeFormat: 'm'
	});
	const [isIntermediate, setIsIntermediate] = useState(props.newMenuItem.isIntermediate)

	const categories = [
		'Aperitivo',
		'Entrante',
		'Principal',
		'Guarnición',
		'Postre',
		'Snack',
		'Bocadillo',
		'Preelaboración',
	];

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		setNewItem({ ...newItem, [name]: value });
		props.stateShare({ ...newItem, [name]: value });
	}

	function handleSwitch(e) {
		setIsIntermediate(e.target.checked)

		e.target.checked &&
		setNewItem({...newItem, isIntermediate: e.target.checked})
		props.stateShare({ ...newItem, isIntermediate: e.target.checked})

		!e.target.checked &&
		delete newItem.isIntermediate
		delete newItem.finalWeight
	}

	return (
		<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
			<Typography variant="h6">Nueva referencia</Typography>
			<Box sx={{ m: 1 }}>
				<TextField
					error={props.validate && !newItem.name ? true : false}
					helperText={
						props.validate && !newItem.rationNumber
							? 'Ponle nombre, hostia!'
							: ''
						}
					fullWidth
					id="outlined-search"
					type="search"
					label="Nombre"
					name="name"
					value={newItem.name}
					onChange={handleChange}
					margin="normal"
					autoComplete="off"
				/>
				<Box sx={{ display: 'flex' }}>
					<TextField
						error={props.validate && !newItem.rationNumber ? true : false}
						helperText={
							props.validate && !newItem.rationNumber ? 'Por favor...' : ''
						}
						sx={{ width: '50%' }}
						id="outlined-required"
						type="number"
						label="Nº Raciones"
						name="rationNumber"
						value={newItem.rationNumber}
						onChange={handleChange}
						margin="normal"
					/>
					<FormControl
						fullWidth
						sx={{ marginTop: 2, marginLeft: 1 }}
						error={props.validate && !newItem.category ? true : false}
					>
						<InputLabel>Categoría</InputLabel>
						<Select
							labelId="category-label"
							name="category"
							value={newItem.category}
							label="Categoría"
							onChange={handleChange}
						>
							{categories.map((item) => (
								<MenuItem key={item} value={item}>
									{item}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center'}}>
					<TextField
						error={props.validate && !newItem.prepTime ? true : false}
						helperText={
							props.validate && !newItem.prepTime ? 'Cuánto tardas?!' : ''
						}
						id="outlined-required"
						type="number"
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						label="Tiempo elaboración"
						name="prepTime"
						value={newItem.prepTime}
						onChange={handleChange}
						margin="normal"
					/>
					<ToggleButtonGroup 
						sx={{ml: 1, mt: 1}}
						color="primary"
						value={newItem.timeFormat || 'm'}
						name='timeFormat'
						exclusive
						onChange={handleChange}
					>
						<ToggleButton name='timeFormat' value="m">Minutos</ToggleButton>
						<ToggleButton name='timeFormat' value="h">Horas</ToggleButton>
					</ToggleButtonGroup>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center'}}>					
					<FormControlLabel 
					control={<Switch 
						checked={isIntermediate}
						onChange={handleSwitch}
						/>} 
					label="¿Es una base?"
					name='isIntermediate'
					/>
					{isIntermediate && 
					<TextField
						error={props.validate && !newItem.finalWeight ? true : false}
						helperText={
							props.validate && !newItem.finalWeight ? 'Pésalo joder!' : ''
						}
						type="number"
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						label="Peso final (Kg)"
						name="finalWeight"
						value={newItem.finalWeight}
						onChange={handleChange}
						margin="normal"
					/>
					}
				</Box>
			</Box>
		</Box>
	);
}
