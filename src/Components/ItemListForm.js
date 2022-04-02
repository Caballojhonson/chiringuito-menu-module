import { Box, Typography, Autocomplete, TextField, Fab, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';


export default function ItemListForm(props) {
	const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('')
    const [addedProducts, setAddedProducts] = useState(props.newMenuItem.items || [])

	useEffect(() => {
		getProducts()
	}, []);

	async function getProducts() {
		const products = await axios
			.get('https://chiringuito-api.herokuapp.com/api/items')

        const sortedBySupplier = products.data.data.sort((a,b) => (a.supplier > b.supplier) ? 1 : -1)
		setProducts(sortedBySupplier)
	}

    function handleSelect(event, selected) {
        setSelectedProduct(selected)
        addProduct(selected)
		setSelectedProduct('')
    }

	function handleNext() {
		props.next()
	}

	function addProduct(product) {
		const inListAlready = () => {
			if(props.newMenuItem.items) {
			return props.newMenuItem.items.find(item => item._id === product._id)
			}
		}

		if(product && !inListAlready()) {
			setAddedProducts(prev => [...prev, product])
			props.stateShare({items: [...addedProducts, product]})
		}
    }
	
	function deleteProduct(id) {
		setAddedProducts(addedProducts.filter(item => item._id !== id))
		props.removeItem(id)
	}

	function ProductSelect() {
		return (
			<Box sx={{ m: 1 }}>
				<Autocomplete
					fullWidth
					autoHighlight
					sx={{ marginTop: 2, marginLeft: 1 }}
					disablePortal
					id="product-select"
                    value={selectedProduct}
                    onChange={handleSelect}
					options={products}
                    groupBy={(option) => option.supplier}
					getOptionLabel={(option) => option.name || ''}
					renderOption={(props, option) => {
						const hasBeenSelected = addedProducts.find(item => item._id === option._id)
						const normalStyle = { display: 'flex', maxWidth: 500 }
						const addedStyle = { display: 'flex', maxWidth: 500, backgroundColor: 'rgba(255, 105, 180, 0.08)', textDecoration: 'line-through' }
						return (
						<Box key={option.id} component="li"  {...props} sx= {hasBeenSelected ?  addedStyle :  normalStyle}>
							<Typography  variant="caption">{option.name}</Typography>
                            <div style= {{display: 'flex', flexGrow:2}}></div>
							<Typography variant="h6">{option.price}€</Typography>
						</Box>
					)}}
					renderInput={(params) => (
						<TextField
							{...params}
							error={props.validate && !addedProducts.length ? true : false}
							helperText={props.validate && !addedProducts.length ? 
										'¿Vas a escandallar la nada?' : ''}
							label="Selecciona un producto"
                            variant='standard'
							inputProps={{
								...params.inputProps,
								autoComplete: 'off', // disable autocomplete and autofill
							}}
						/>
					)}
				/>
			</Box>
		);
	}

	function ProductBox(props) {
		const unitPrice = () => {
			if(props.item.packQuantity) {
				return ` | ${(props.item.price / props.item.packQuantity).toFixed(2)}€ / Unidad`
			} else return ''
		}
		const productPrice = props.item.price.toFixed(2)
		const productFormat = props.item.format

		return(
				  <ListItem
					secondaryAction={
					  <IconButton edge="end" aria-label="delete"
						onClick={() => deleteProduct(props.item._id)}
					  >
						<DeleteIcon />
					  </IconButton>
					}
					>
					<ListItemAvatar>
					  <Avatar>
						<FastfoodIcon />
					  </Avatar>
					</ListItemAvatar>
					<ListItemText
					  primary={props.item.name}
					  secondary={`${productPrice}€ / ${productFormat} 
					  ${unitPrice()}`}
					  secondaryTypographyProps={{fontSize: '0.7rem', fontWeight: 900}}
					/>
				  </ListItem>
		)
	}

	const renderProductBoxes = addedProducts.map(item => {
			return(
				<Collapse key={item._id}>
					<ProductBox item={item} />
				</Collapse>
			)
		})

	return (
			<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
				<Typography variant="h6">Productos</Typography>

			<Grid item xs={12} md={6}>
			  	<List dense>
					<TransitionGroup>
						{renderProductBoxes}
					</TransitionGroup>
				</List>
		    </Grid> 

				<ProductSelect />

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
						mt: 3,
					}}
				>
					<Fab color="secondary" aria-label="add" variant="extended" onClick={handleNext}>
						<PlaylistAddCheckIcon sx={{mr:1}} />
						Siguiente
					</Fab>
				</Box>
			</Box>
	);
}
