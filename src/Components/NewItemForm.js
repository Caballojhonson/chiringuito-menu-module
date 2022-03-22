import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function NewItemForm() {
	const mockList = ['Entrante', 'Aperitivo', 'Postre'];

	return (
		<div>
			<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
				<Typography variant="h6">Nueva referencia</Typography>
				<Box sx={{ m: 1 }}>
					<TextField
						fullWidth
						id="outlined-search"
                        type='search'
						label="Nombre"
						margin="normal"
					/>
					<Box sx={{ display: 'flex' }}>
						<TextField
							sx={{ width: '50%' }}
							id="outlined-required"
							label="Nº Raciones"
							margin="normal"
						/>
						<Autocomplete
                            fullWidth
							sx={{ marginTop: 2, marginLeft: 1 }}
							disablePortal
							id="combo-box-demo"
							options={mockList}
							renderInput={(params) => (
								<TextField {...params} label="Categoría" />
							)}
						/>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
