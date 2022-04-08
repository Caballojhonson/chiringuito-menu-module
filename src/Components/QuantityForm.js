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
	Button,
	Modal,
	Card,
	TextField,
	OutlinedInput,
	InputLabel,
	IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import CostAndMargin from './CostAndMargin';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import uniqid from 'uniqid';
export default function QuantityForm(props) {
	const { newMenuItem } = props;

	const [showSupplementModal, setShowSupplementModal] = useState(false)
	const [supplement, setSupplement] = useState({})
	const [supplements, setSupplements] = useState([])
    const [quantities, setQuantities] = useState(previousQuants() || {})
    const [totalCost, setTotalCost] = useState(getTotalCost())
	const [supplementedTotalCost, setSupplementedTotalCost] = useState('')

	function handleSupplementChange(e) {
		const key = e.target.name
		const value = e.target.value
		setSupplement({...supplement, [key]: value})
	}

	function addSupplement() {
		const idedSupplement = {...supplement, id: uniqid()}
		setSupplements(prev => [...prev, idedSupplement])
		props.shareState({supplements: [...supplements, idedSupplement]})
		setShowSupplementModal(false)
		setSupplement({})
	}

	function removeSupplement(id) {
		props.removeSupplement(id)
		setSupplements(prev => prev.filter(item => item.id !== id))
	}

	function previousQuants() {
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
        setQuantities({...quantities, [id]: Number(quantity)})
        setTotalCost(getTotalCost()) 
	}

    const totalProductCost = (item) => {
        const total = `${(item.price / (item.packQuantity || 1) * quantities[item._id]).toFixed(2)}€`

        if(total !== 'NaN€') return total 
        else return ''
    }

    function getTotalCost() {
    const total = newMenuItem.items.reduce((a,b) => 
    a + (b.quantity * b.price / (b.packQuantity || 1)) ,0)
    return total || 0
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
                            <FormHelperText>{totalProductCost(item)}</FormHelperText>
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

	const supplementList = newMenuItem.supplements &&
	newMenuItem.supplements.map((item, i) => {

		const supplementQuantity = Math.ceil(((item.percentage * totalCost / 100) / newMenuItem.rationNumber) * 100) / 100

		return (
			<Paper elevation={2} sx={{mt:'0.3rem', mb:'0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} key={'supplement' + i} >
				<ListItem 
				key={'supplement' + i}
				secondaryAction={
					<Typography variant='h6'>
						{`${item.percentage}%`}
					</Typography>
				}
				>
					<ListItemText 
						primary={item.concept}
						secondary={supplementQuantity.toFixed(2) + '€'}
						primaryTypographyProps={{ fontSize: '0.8rem' }}
						secondaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 900 }}
					/>
				</ListItem>
				<IconButton onClick={() => removeSupplement(item.id)}>
					<DeleteIcon 
					sx={{color: 'rgba(0, 0, 0, 0.54)', ml:'1rem', mr: '1rem'}}
					/>
				</IconButton>
				
			</Paper>
		)
	})

	const addSupplementBtn = (
		 <Box  sx={{display: 'flex', justifyContent: 'center', m:2, alignItems: 'center'}}>
			<Button 
			color='secondary' 	
			startIcon= {<AddRoundedIcon  />}
			onClick={() => setShowSupplementModal(true)}
			>
				Añadir recargo
			</Button>
		 </Box>

	)

	const supplementModal = () => {
		const style = {
			backgroundColor: 'white',
			position: 'fixed',
			width: '70%',
			height: '70vh',
			padding: 3
		}

		return(
			<Modal 
			open={showSupplementModal} 
			onClose={() => setShowSupplementModal(false)}
			sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
			>
				<Card sx={style}>
				<Button
						sx={{mb: 3}}
						color='secondary' 	
						startIcon= {<ArrowBackIosRoundedIcon  />}
						onClick={() => setShowSupplementModal(false)}>
							volver
						</Button>
					<Typography variant="h6">
						Añadir recargo
					</Typography>
					<Typography variant="body2">
						Añade un concepto y un porcentaje de incremento sobre el producto que estás escandallando.
					</Typography>
					<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
						<TextField 
						label="Concepto"
						placeholder='Desechables, aderezos...'
						name="concept"
						value={supplement.concept}
						onChange={handleSupplementChange}
						margin="normal"
						/>
						<FormControl>
							<InputLabel htmlFor="percent">Porcentaje</InputLabel> 
							<OutlinedInput 
							id='percent'
							label="Porcentaje"
							type= 'number'
							name="percentage"
							endAdornment={<InputAdornment position="end">
										<PercentRoundedIcon/>
										</InputAdornment>}
							value={supplement.percentage}
							onChange={handleSupplementChange}
							margin="normal"
							/>
						</FormControl>
						<Box sx={{display: 'flex', justifyContent: 'center'}}>
							<Button
							sx={{mt: 3, maxWidth: '10rem'}}
							color='secondary' 	
							startIcon= {<AddRoundedIcon  />}
							onClick={addSupplement}
							variant='outlined'
							>
								Añadir
							</Button>
						</Box>
					</Box>
				</Card>
			</Modal>
	
		)
	}
	

	return (
		<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
			<Typography variant="h6">Cantidades</Typography>
			{supplementModal()}
			{productList}
			{supplementList}
			
			{!(Object.values(quantities).some(val => val === undefined || val === 0)) && //Input validation (No empty quants)
			<Box>
			{addSupplementBtn}
			<CostAndMargin totalCost={totalCost} newMenuItem={newMenuItem} />
			</Box>
			}
		</Box>
	);
}
