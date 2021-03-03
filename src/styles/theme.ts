import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// https://next.material-ui.com/customization/default-theme
// https://next.material-ui.com/customization/color
export const customTheme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#376aed',
            dark: '#2053d2',
        },
        text: {
            primary: '#376aed'
        }
    },
}));