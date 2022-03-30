import React, { useState } from 'react';
import {
	TextField,
	Typography,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material';
import { Box } from '@mui/system';

export default function NewItemForm(props) {
	const [newItem, setNewItem] = useState(props.newMenuItem || {});

	const categories = [
		'Aperitivo',
		'Entrante',
		'Principal',
		'Guarnición',
		'Postre',
		'Snack',
		'Bocadillo',
		'Salsa',
	];

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		setNewItem({ ...newItem, [name]: value });
		props.stateShare({ ...newItem, [name]: value })
	}

	return (
		<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
			<Typography variant="h6">Nueva referencia</Typography>
			<Box sx={{ m: 1 }}>
				<TextField
					error={props.validate && !newItem.name ? true : false}
					helperText={props.validate && !newItem.rationNumber ? 'Ponle nombre, hostia!' : ''}
					fullWidth
					id="outlined-search"
					type="search"
					label="Nombre"
					name="name"
					value={newItem.name}
					onChange={handleChange}
					margin="normal"
					autoComplete='off'
				/>
				<Box sx={{ display: 'flex' }}>
					<TextField
						error={props.validate && !newItem.rationNumber ? true : false}
						helperText={props.validate && !newItem.rationNumber ? 'Por favor...' : ''}
						sx={{ width: '50%' }}
						id="outlined-required"
						type='number'
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						label="Nº Raciones"
						name="rationNumber"
						value={Number(newItem.rationNumber)}
						onChange={handleChange}
						margin="normal"
					/>
					<FormControl
						fullWidth 
						sx={{ marginTop: 2, marginLeft: 1 }} 
						error={props.validate && !newItem.category ? true : false}>
						<InputLabel>Categoría</InputLabel>
						<Select
							labelId="category-label"
							name="category"
							value={newItem.category}
							label="Categoría"
							onChange={handleChange}
						>
							{categories.map((item) => (
								<MenuItem key={item} value={item}>{item}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
		</Box>
	);
}
