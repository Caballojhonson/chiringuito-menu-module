import {
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import React from 'react';

export default function NewProductHeader(props) {
	const { newMenuItem } = props;
	return (
        <Box sx={{ margin: '1rem 1.5rem 1rem 1.5rem' }}>    
		<ListItem

			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={props.prev}
				>
					<EditIcon />
				</IconButton>
			}
		>
			<ListItemAvatar>
				<Avatar>
					<FastfoodIcon  />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={newMenuItem.name}
				secondary={`${newMenuItem.rationNumber} Raciones, ${newMenuItem.prepTime}${newMenuItem.timeFormat || 'm'}`}
				secondaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 900 }}
			/>
		</ListItem>
        </Box>
	);
}
