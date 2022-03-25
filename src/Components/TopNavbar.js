import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function TopNavbar(props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						size="small"
						edge="start"
						color="inherit"
						aria-label="back"
						sx={{ mr: 2 }}
					>
						<ArrowBackIosNewIcon fontSize='6rem' onClick={props.prev} />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Escandallar
					</Typography>
					{/* <IconButton color="inherit" size="large">
						<CheckCircleOutlineIcon fontSize='1rem' />
					</IconButton> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
