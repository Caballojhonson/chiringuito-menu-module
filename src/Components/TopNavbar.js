import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';

export default function TopNavbar(props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						onClick={props.prev}
						size="small"
						edge="start"
						color="inherit"
						aria-label="back"
						sx={{ mr: 2 }}
					>
						<ArrowBackIosNewIcon fontSize="6rem" />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Escandallar
					</Typography>
					<IconButton
						sx={{ display: 'flex', flexDirection: 'column' }}
						color="inherit"
						onClick={props.showCalculator}
					>
						<CalculateSharpIcon fontSize="large" />
						<Typography variant="caption" fontSize={'0.5rem'}>
							Calculadora
						</Typography>
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
