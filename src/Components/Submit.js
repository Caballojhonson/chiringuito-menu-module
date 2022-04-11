import React, {useState} from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import {
	Box
} from '@mui/material';


export default function Submit(props) {
    const {newMenuItem, stats } = props
    const [sending, setSending] = useState(false);


    function mockDBRes(data) {
		console.log(data);
		setSending(true);
		setTimeout(() => setSending(false), 4000);
	}

  return (
    <div>
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
				<LoadingButton
					loading={sending}
					loadingPosition="start"
					startIcon={<SaveIcon />}
					variant="outlined"
					onClick={() => mockDBRes(newMenuItem)}
				>
					Guardar
				</LoadingButton>
			</Box>

    </div>
  )
}
