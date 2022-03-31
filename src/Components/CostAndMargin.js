import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	Input,
    InputAdornment,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
	Slider,
    LinearProgress,
    Stack,
    Paper
} from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
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

    function handlePriceInput(e) {
        console.log(e.target.value)
        const price = e.target.value
        console.log(price)
        console.log(Math.round(price / costPerUnit() * 100))
        setMargin(Math.round(price / costPerUnit() * 100))
    }

    function valueLabelFormat(val) {
        return `${val}%`
    }

    function costPerUnit() {
        return totalCost / newMenuItem.rationNumber
    }

    function LinearProgressWithLabel(props) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress color='secondary' variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.label,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }

    const normalise = (value) => ((value - 100) * 100) / (500 - 100);

    function priceColor(margin) {
        if (margin < 150 || margin > 450) return 'red'
        if (margin < 200 || margin > 400) return 'orange'
        if (margin > 200 && margin < 400) return 'green'
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

	function FinalPriceFixed() {
		return (
			<Grid container sx={{ alignItems: 'end' }}>
				<Grid item xs>
					<CostItem primary="PVP" secondary="Precio venta" />
				</Grid>
				<Grid item xs={5}>
					<TextField
						value={finalPrice.toFixed(2)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                          }}
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

    function FinalPriceManual() {
		return (
			<Grid container sx={{ alignItems: 'end' }}>
				<Grid item xs>
					<CostItem 
                    primary="PVP" 
                    secondary="Precio venta" 
                    input={
                        <Box sx={{display: 'flex', }}>
                            <RemoveCircleOutlineRoundedIcon 
                                sx={{ml: '0.5rem', mr: '0.5rem'}} 
                                fontSize='large' 
                                onClick={() => {
                                    setFinalPrice(prev => prev - 0.1)
									// Had to manually increment the price in margin calculation as changed were not being applied on time
                                    setMargin(Math.round((finalPrice - 0.1) / costPerUnit() * 100))
                                }
                                }
                            />

                            <Typography sx={{ fontSize: '1.2rem', color: `${priceColor(margin)}` }}  variant="button">
                                {(Math.round(finalPrice * 10) / 10).toFixed(2) + '€'}
                            </Typography>

                            <AddCircleOutlineRoundedIcon 
                                sx={{ml: '0.5rem', mr: '0.5rem'}} 
                                fontSize='large' 
                                onClick={() => {
                                    setFinalPrice(prev => prev + 0.1)
									// Had to manually increment the price in margin calculation as changed were not being applied on time
                                    setMargin(Math.round((finalPrice + 0.1) / costPerUnit() * 100))
                                }
                                }
                            />
                        </Box>
                    } 
                    />
				</Grid>
			</Grid>
		);
	}

    function ProgressBar(props) {
        const { title, value, progressLabel } = props
        return(
            <Box>
                <Typography  variant='overline' color='text.secondary'>{title}</Typography>
                <LinearProgressWithLabel value={value} label={progressLabel}  />
            </Box>

        )
    }

	return (
		<Box >
			<List component="nav" aria-label="Cost and margin list">
                <FinalPriceManual  />
				<CostItem
					primary="COSTE"
					secondary="Por ración"
					quantity={`${costPerUnit().toFixed(2)}€`}
				/>
                <CostItem primary="diferencial" secondary="Beneficio" quantity={(finalPrice - costPerUnit()).toFixed(2) + '€'} />
				{/* <FinalPriceFixed /> */}
				{/* <CostItem primary='COSTE' secondary='Total escandallo' quantity={`${totalCost && totalCost.toFixed(2)}€`} /> */}
                <ProgressBar title='margen de beneficio' value={normalise(margin)} progressLabel={margin}  />
                <Slider
				onChange={handleSlider}
				defaultValue={300}
				min={100}
				max={500}
                valueLabelFormat={valueLabelFormat}
			/>

                <ProgressBar title='Coste / Pvp' value={costPerUnit() / finalPrice  * 100} progressLabel={(costPerUnit() / finalPrice  * 100) || 0}  />
			</List>
		</Box>
	);
}
