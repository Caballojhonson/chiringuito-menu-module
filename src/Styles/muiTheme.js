import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';


export const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#ff69b4',
            dark: '#002884',
            contrastText: '#4b4646',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});