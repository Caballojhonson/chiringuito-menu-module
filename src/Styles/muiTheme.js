import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const theme = createTheme({
    typography: {
        fontFamily: 'Roboto',
      },
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