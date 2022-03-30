import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	Input,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
	Slider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CostAndMargin(props) {
	const { newMenuItem, totalCost } = props;

	const [margin, setMargin] = useState(300);
	const [finalPrice, setFinalPrice] = useState(costPerUnit() * margin);

    useEffect(() => {
      setFinalPrice(costPerUnit() * margin / 100)
    }, [totalCost])
    
    

	function handleSlider(e, value) {
		setMargin(value);
		setFinalPrice((value * costPerUnit()) / 100);
	}

    function handlePriceInput(e, value) {
        setFinalPrice(value)
    }

    function valueLabelFormat(val) {
        return `${val}%`
    }

    function costPerUnit() {
        return totalCost / newMenuItem.rationNumber
    }

	function CostItem(props) {
		return (
			<div>
				<ListItem
					button
					secondaryAction={
						props.input || (
							<Typography sx={{ fontSize: '1.2rem' }} variant="button">
								{props.quantity}
							</Typography>
						)
					}
				>
					<ListItemText
						primary={
							<Typography
								sx={{ lineHeight: 0.5, fontSize: '0.7rem', color: '#727272' }}
								variant="overline"
							>
								{props.primary}
							</Typography>
						}
						secondary={
							<Typography variant="body1">{props.secondary}</Typography>
						}
					/>
				</ListItem>
				<Divider />
			</div>
		);
	}

	function FinalPriceInput() {
		return (
			<Grid container sx={{ alignItems: 'end' }}>
				<Grid item xs>
					<CostItem primary="PVP" secondary="Precio venta" />
				</Grid>
				<Grid item xs={5}>
					<TextField
						value={`${finalPrice.toFixed(2)}€`}
                        onChange={handlePriceInput}
						label="PVP"
						variant="filled"
					/>
				</Grid>
				<Grid item>
					<Button variant="contained">Redondear</Button>
				</Grid>
			</Grid>
		);
	}

	return (
		<Box >
			<Typography variant="h6">Margen y PVP</Typography>

			<List component="nav" aria-label="Cost and margin list">
				<CostItem
					primary="COSTE"
					secondary="Por ración"
					quantity={`${costPerUnit().toFixed(2)}€`}
				/>
				<FinalPriceInput />
				{/* <CostItem primary='COSTE' secondary='Total escandallo' quantity={`${totalCost && totalCost.toFixed(2)}€`} /> */}
			</List>
			<Slider
				onChange={handleSlider}
				defaultValue={300}
				min={100}
				max={1000}
                valueLabelFormat={valueLabelFormat}
				valueLabelDisplay="on"
			/>
		</Box>
	);
}
