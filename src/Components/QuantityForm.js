import {
	Box,
	Typography,
	ListItem,
	ListItemText,
	InputAdornment,
	FormControl,
	Input,
    FormHelperText
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

	function handleChange(e) {
		const id = e.target.name;
		const quantity = e.target.value;
		props.addQuantity(quantity, id);
	}

    const totalPrice = (item) => {
        return item.packQuantity ? `${(item.price / item.packQuantity * item.quantity).toFixed(2)}€` : ''
    }

	const productList = newMenuItem.items.map((item) => {
        
		return (
			<ListItem
				secondaryAction={
					<FormControl>
						<Input
							// error={props.validate && !newItem.name ? true : false}
							label='koko'
							sx={{ width: '5rem' }}
							endAdornment={
                                <InputAdornment sx={{ fontSize: '0.6rem' }} position="end">
									{adornmentTag(item)}
								</InputAdornment>
							}
							size="small"
							name={item._id}
							type="number"
							inputProps={{ style: { textAlign: 'center' } }}
							onChange={handleChange}
						/>
                            <FormHelperText>{totalPrice(item)}</FormHelperText>
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
