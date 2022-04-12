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

        console.log(sanitizeData())
		setSending(true);
		setTimeout(() => setSending(false), 4000);
	}

    function sanitizeData() {
        const rawData = { ...newMenuItem, ...stats()}
		
		const ceil2Int = (num) => Math.ceil(num * 100) / 100 
		
		
		rawData.finalWeight = Number(rawData.finalWeight)
		rawData.prepTime = Number(rawData.prepTime)
		rawData.rationNumber = Number(rawData.rationNumber)
		
		if(!rawData.timeFormat) rawData.timeFormat = 'm'

		rawData.profitPerRation = ceil2Int(rawData.profitPerRation)
		
        
		rawData.pvp = ceil2Int(rawData.pvp)
		rawData.timestamp = new Date()
		rawData.ingredients = rawData.items.map(item => item._id)
		rawData.quantities = rawData.items.map(item => {
			return {
				ingredient: item._id,
				quantity: Number(item.quantity)
			}
		})
		rawData.supplements = rawData.supplements.map(item => {
			delete item.id
			
			return {
				concept: item.concept,
				percentage: Number(item.percentage)
			}
		})

		delete rawData.items

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
