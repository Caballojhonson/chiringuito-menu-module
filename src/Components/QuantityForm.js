import {
	Box,
	Typography,
	ListItem,
	ListItemText,
	InputAdornment,
	FormControl,
	Input,
    FormHelperText,
    Paper,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import CostAndMargin from './CostAndMargin';
import Supplements from './Supplements';

export default function QuantityForm(props) {
	const { newMenuItem } = props;

    const [quantities, setQuantities] = useState(previousQuants() || {})
    const [totalProductCost, setTotalProductCost] = useState(getTotalProductCost())

	useEffect(() => {
		setTotalProductCost(getTotalProductCost()) 
	}, [newMenuItem])
	
	function previousQuants() {  //PLEASE refactor stupid function
		let quants = {};

		newMenuItem.items.forEach(item => {
			quants = {...quants, [item._id]: item.quantity}
		})

		return Object.keys(quants).length ? quants : undefined
	}

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
        setQuantities({...quantities, [id]: quantity})
        setTotalProductCost(getTotalProductCost()) 
	}

    const getThisProductsCost = (item) => {
        const total = `${(item.price / (item.packQuantity || 1) * quantities[item._id]).toFixed(2)}€`

        if(total !== 'NaN€') return total 
        else return ''
    }

    function getTotalProductCost() {
    const productTotal = newMenuItem.items.reduce((a,b) => 
    a + (b.quantity * b.price / (b.packQuantity || 1)) ,0)

    return productTotal || 0
    }

	const productList = newMenuItem.items.map((item) => {
		return (
            <Paper elevation={2} sx={{mt:'0.3rem', mb:'0.3rem'}} key={item._id + 'paper'} >
			<ListItem 
                key={item._id}
				secondaryAction={
					<FormControl >
						<Input 
							sx={{ width: '5rem', pl: '1.2rem', backgroundColor: 'white' }}
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
							value={quantities[item._id]}
						/>
                            <FormHelperText>{getThisProductsCost(item)}</FormHelperText>
					</FormControl>
				}
			>
				<ListItemText
					primary={item.name}
					secondary={`${item.price}€ / ${item.format} ${unitPrice(item)}`}
					primaryTypographyProps={{ fontSize: '0.8rem' }}
					secondaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 900 }}
				/>
			</ListItem></Paper>
		)
	})

	const nonEmptyFields = !(Object.values(quantities).some(val => val === undefined || val === 0))
	

	return (
		<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
			<Typography variant="h6">Cantidades</Typography>

			{productList}
			
			{ nonEmptyFields &&
			<Box>
				<Supplements 
				newMenuItem={newMenuItem} 
				totalProductCost={totalProductCost} 
				shareState={props.shareState} 
				removeSupplement={props.removeSupplement} 
				/>

				<CostAndMargin 
				totalProductCost={totalProductCost} 
				newMenuItem={newMenuItem} 
				/>
			</Box>
			}
		</Box>
	);
}
