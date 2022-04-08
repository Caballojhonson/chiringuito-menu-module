import React, {useState} from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import uniqid from 'uniqid';
import {
	Box,
	Typography,
	ListItem,
	ListItemText,
	InputAdornment,
	FormControl,
    Paper,
	Button,
	Modal,
	Card,
	TextField,
	OutlinedInput,
	InputLabel,
	IconButton,
} from '@mui/material';


export default function Supplements(props) {
    const { newMenuItem, totalProductCost } = props

    const [supplement, setSupplement] = useState({})
	const [supplements, setSupplements] = useState([])
	const [supplementedTotalCost, setSupplementedTotalCost] = useState('')
    const [showSupplementModal, setShowSupplementModal] = useState(false)

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

    const supplementList = newMenuItem.supplements &&
	newMenuItem.supplements.map((item, i) => {

		const supplementQuantity = Math.ceil(((Number(item.percentage) / 100) * totalProductCost / newMenuItem.rationNumber) * 100) / 100

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
						margin="dense"
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
							margin="dense"
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
    <div>
        {supplementModal()}
        {supplementList}
        {addSupplementBtn}

    </div>
  )
}
