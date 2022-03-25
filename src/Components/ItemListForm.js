import { Box, Typography, Autocomplete, TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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


export default function ItemListForm() {
	const [products, setProducts] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('')
    const [addedProducts, setAddedProducts] = useState([])

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
    }

	function addProduct(product) {
		product && setAddedProducts(prev => [...prev, product])
    }
	
	function deleteProduct(id) {
		setAddedProducts(addedProducts.filter(item => item._id !== id))
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
					renderOption={(props, option) => (
						<Box key={option.id} component="li" sx={{ display: 'flex', maxWidth: 500 }} {...props}>
							<Typography  variant="caption">{option.name}</Typography>
                            <div style= {{display: 'flex', flexGrow:2}}></div>
							<Typography variant="h6">{option.price}€</Typography>
						</Box>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Selecciona un producto"
                            variant='standard'
							inputProps={{
								...params.inputProps,
								autoComplete: 'new-password', // disable autocomplete and autofill
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
				return (props.item.price / props.item.packQuantity).toFixed(2)
			} else return ''
		}
		const productPrice = props.item.price.toFixed(2)
		const productFormat = props.item.format

		return(
			<Grid item xs={12} md={6}>
			  <List dense='false'>
				
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
					  secondary={`${productPrice}€ / ${productFormat} | 
					  ${unitPrice()}€ / Unidad`}
					  secondaryTypographyProps={{fontSize: '0.7rem', fontWeight: 900}}
					/>
				  </ListItem>
			  </List>
		  </Grid> 
		)
	}

	const renderProductBoxes = addedProducts.map(item => {
			return(
				<ProductBox item={item} />
			)
		})

	return (
			<Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>
				<Typography variant="h6">Productos</Typography>

				{renderProductBoxes}
				<ProductSelect />

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
						mt: 3,
					}}
				>
					<Fab color="secondary" aria-label="add" variant="extended">
					<PlaylistAddCheckIcon sx={{mr:1}} />
						Siguiente
					</Fab>
				</Box>
			</Box>
	);
}
