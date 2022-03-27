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
import React, { useState } from 'react';

export default function QuantityForm(props) {
	const { newMenuItem } = props;

    const [quantities, setQuantities] = useState({})

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
		props.addQuantity(Number(quantity), id);
        setQuantities({...quantities, [id]: Number(quantity)})
	}

    const totalPrice = (item) => {
        const total = `${(item.price / (item.packQuantity || 1) * quantities[item._id]).toFixed(2)}€`

        if(total !== 'NaN€') return total 
        else return ''
    }

	const productList = newMenuItem.items.map((item) => {
        
		return (
			<ListItem
                key={item._id}
				secondaryAction={
					<FormControl >
						<Input 
							// error={props.validate && !newItem.name ? true : false}
							label='koko'
							sx={{ width: '5rem' }}
							endAdornment={
                                <InputAdornment sx={{ fontSize: '0.6rem' }} position="end">
									{adornmentTag(item)}
								</InputAdornment>
							}
                            variant='filled'
							size="small"
                            margin='dense'
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
