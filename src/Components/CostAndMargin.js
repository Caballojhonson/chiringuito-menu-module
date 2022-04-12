import {
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
	Slider,
	LinearProgress,
	Avatar,
	ListItemAvatar,
} from '@mui/material';

import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutline from '@mui/icons-material/AddCircleOutlineRounded';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BalanceIcon from '@mui/icons-material/Balance';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import React, { useEffect, useState } from 'react';
import Submit from './Submit';


export default function CostAndMargin(props) {
	const { newMenuItem, totalProductCost } = props;

	const [margin, setMargin] = useState(300);
	const [finalPrice, setFinalPrice] = useState(Math.round(Math.ceil(costPerUnit() * margin) / 100 * 10)  / 10);

	useEffect(() => {
		setFinalPrice(Math.round(Math.ceil(costPerUnit() * margin) / 100 * 10)  / 10)
		getStats()
	}, [totalProductCost, margin, newMenuItem]); // ADDED MARGIN TO DEPS !!!

	function getStats() {
		return ( {
			pvp: finalPrice,
			totalCost: totalCost(),
			costPerRation: costPerUnit(),
			costPerKilo: costPerKilo(),
			profitPerRation: finalPrice - costPerUnit(),
			margin: margin,
		} )
	}

	function handleSlider(e, value) {
		setMargin(value);
		setFinalPrice((value * costPerUnit()) / 100);
	}

	function valueLabelFormat(val) {
		return `${val}%`;
	}

	function totalCost() {
		const ceilCurrency = (num) => Math.ceil(num * 100) / 100;

		const supplementTotalPercentage =
			newMenuItem.supplements &&
			newMenuItem.supplements.reduce((a, b) => a + Number(b.percentage), 0);

		const totalSupplementCost =
			(supplementTotalPercentage * totalProductCost) / 100;
		const totalCost = totalSupplementCost + totalProductCost;

		if (supplementTotalPercentage) {
			return ceilCurrency(totalCost);
		} else return ceilCurrency(totalProductCost);
	}

	function costPerUnit() {
		const ceilCurrency = (num) => Math.ceil(num * 100) / 100;
		const totalPricePerUnit = totalCost() / newMenuItem.rationNumber;
		return ceilCurrency(totalPricePerUnit);
	}

	function costPerKilo() {
		const kilos = newMenuItem.finalWeight;
		const costPerKilo = totalCost() / kilos;

		return Math.ceil(costPerKilo * 100) / 100;
	}

	function LinearProgressWithLabel(props) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress color="secondary" variant="determinate" {...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" color="text.secondary">{`${Math.round(
						props.label
					)}%`}</Typography>
				</Box>
			</Box>
		);
	}

	const normalise = (value) => ((value - 100) * 100) / (500 - 100);

	function priceColor(margin) {
		if (margin < 150 || margin > 450) return 'red';
		if (margin < 200 || margin > 400) return 'orange';
		if (margin > 200 && margin < 400) return 'green';
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
					<ListItemAvatar>
						<Avatar>{props.icon}</Avatar>
					</ListItemAvatar>
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

	function FinalPriceManual() {
		return (
			<Grid container sx={{ alignItems: 'end' }}>
				<Grid item xs>
					<CostItem
						icon={<PointOfSaleIcon />}
						primary="PVP"
						secondary="Carta"
						input={
							<Box sx={{ display: 'flex' }}>
								<RemoveCircleOutline
									sx={{ ml: '0.5rem', mr: '0.5rem' }}
									fontSize="large"
									onClick={() => {
										setFinalPrice((prev) => prev - 0.1);
										// Had to manually increment the price in margin calculation as changed were not being applied on time
										setMargin(
											Math.round(((finalPrice - 0.1) / costPerUnit()) * 100)
										);
									}}
								/>

								<Typography
									sx={{ fontSize: '1.2rem', color: `${priceColor(margin)}` }}
									variant="button"
								>
									{(Math.round(finalPrice * 10) / 10).toFixed(2) + '€'}
								</Typography>

								<AddCircleOutline
									sx={{ ml: '0.5rem', mr: '0.5rem' }}
									fontSize="large"
									onClick={() => {
										setFinalPrice((prev) => prev + 0.1);
										// Had to manually increment the price in margin calculation as changed were not being applied on time
										setMargin(
											Math.round(((finalPrice + 0.1) / costPerUnit()) * 100)
										);
									}}
								/>
							</Box>
						}
					/>
				</Grid>
			</Grid>
		);
	}

	function ProgressBar(props) {
		const { title, value, progressLabel } = props;
		return (
			<Box>
				<Typography variant="overline" color="text.secondary">
					{title}
				</Typography>
				<LinearProgressWithLabel value={value} label={progressLabel} />
			</Box>
		);
	}

	return (
		<Box>
			<List component="nav" aria-label="Cost and margin list">
				<FinalPriceManual />
				<CostItem
					primary="COSTE"
					secondary="Por ración"
					quantity={`${costPerUnit().toFixed(2)}€`}
					icon={<RestaurantIcon />}
				/>
				{newMenuItem.isIntermediate && (
					<CostItem
						primary="coste"
						secondary="Por kilo"
						quantity={costPerKilo() + '€'}
						icon={<BalanceIcon />}
					/>
				)}
				<CostItem
					primary="diferencial"
					secondary="Beneficio"
					quantity={(finalPrice - costPerUnit()).toFixed(2) + '€'}
					icon={<MonetizationOnIcon />}
				/>
				{/* <CostItem primary='COSTE' secondary='Total escandallo' quantity={`${totalProductCost && totalProductCost.toFixed(2)}€`} /> */}
				<ProgressBar
					title="margen de beneficio"
					value={normalise(margin)}
					progressLabel={margin}
				/>
				<Slider
					onChange={handleSlider}
					defaultValue={300}
					min={100}
					max={500}
					valueLabelFormat={valueLabelFormat}
				/>

				<ProgressBar
					title="Coste / Pvp"
					value={(costPerUnit() / finalPrice) * 100}
					progressLabel={(costPerUnit() / finalPrice) * 100 || 0}
				/>
			</List>
			<Submit newMenuItem={newMenuItem} stats={getStats} /> 
		</Box>
	);
}
