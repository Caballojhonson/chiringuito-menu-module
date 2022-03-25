import {
	Box,
	Typography,
	ListItem,
	TextField,
	ListItemText,
	InputAdornment,
	FormControl,
	Input,
} from '@mui/material';
import React from 'react';

export default function QuantityForm(props) {
	const { newMenuItem } = props;

	const unitPrice = (item) => {
		if (item.packQuantity) {
			return `|| ${(item.price / item.packQuantity).toFixed(2)}€ / uni`;
		} else return '';
	};

	const adornmentTag = (item) => {
		if (item.format === 'Kg') return 'Kg';
		else return 'Uni';
	};

	const productList = newMenuItem.items.map((item) => {
		return (
			<ListItem
				secondaryAction={
					<FormControl variant="standard">
						<Input
							// error={props.validate && !newItem.name ? true : false}
							//helperText={props.validate && !newItem.rationNumber ? 'Ponle nombre, hostia!' : ''}
							sx={{ width: '5rem' }}
							endAdornment={
								<InputAdornment sx={{ fontSize: '0.6rem' }} position="end">
									{adornmentTag(item)}
								</InputAdornment>
							}
							size="small"
							name="name"
							type="number"
							inputProps={{ style: { textAlign: 'center' } }}
							// value={newItem.name}
							// onChange={handleChange}
						/>
					</FormControl>
				}
			>
				<ListItemText
					primary={item.name}
					secondary={`${item.price}€ / ${item.format} ${unitPrice(item)}`}
					primaryTypographyProps={{ fontSize: '0.8rem' }}
					secondaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 900 }}
				/>
			</ListItem>
		);
	});

	return (
		<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
			<Typography variant="h6">Cantidades</Typography>
			{productList}
		</Box>
	);
}
