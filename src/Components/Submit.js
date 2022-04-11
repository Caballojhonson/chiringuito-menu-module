import React, {useState} from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import {
	Box
} from '@mui/material';


export default function Submit(props) {
    const {newMenuItem, stats } = props

    const [sending, setSending] = useState(false);


    function mockDBRes() {

        console.log(processData())
		setSending(true);
		setTimeout(() => setSending(false), 4000);
	}

    function processData() {
        const rawData = { ...newMenuItem, ...stats()}
        
        return rawData
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
