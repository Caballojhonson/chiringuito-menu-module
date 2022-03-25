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
	const [newItem, setNewItem] = useState({});

	const categories = [
		'Entrante',
		'Aperitivo',
		'Principal',
		'Bocadillo',
		'Snack',
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
				error
					helperText='Ponle nombre, hostia!'
					fullWidth
					id="outlined-search"
					type="search"
					label="Nombre"
					name="name"
					value={newItem.name}
					onChange={handleChange}
					margin="normal"
				/>
				<Box sx={{ display: 'flex' }}>
					<TextField
					error
						helperText='Por favor...'
						sx={{ width: '50%' }}
						id="outlined-required"
						type='number'
						inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
						label="Nº Raciones"
						name="rationNumber"
						value={newItem.rationNumber}
						onChange={handleChange}
						margin="normal"
					/>
					<FormControl fullWidth sx={{ marginTop: 2, marginLeft: 1 }}>
						<InputLabel>Categoría</InputLabel>
						<Select
						error
							labelId="category-label"
							name="category"
							value={newItem.category}
							label="Categoría"
							onChange={handleChange}
						>
							{categories.map((item) => (
								<MenuItem value={item}>{item}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
		</Box>
	);
}
