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
            dark: '#B33775',
            contrastText: '#4b4646',
        },
        secondary: {
            light: '#4FE9FF',
            main: '#40A4B3',
            dark: '#ba000d',
            contrastText: '#23272E',
        },
    },
});