import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      grisClaro: '#EAEAEA',
      grisMedio:'#D2D2D2',
      grisOscuro: '#6E6F70',
      verdeFuentes:'#59BA47',
      verdeCards:'#226516',
      verdeGestion:'#1D9129',
      naranja:'#B86B11',
      rojo:'#BC1111',
      azul: '#093C59',
      negro: '#090909',
      blanco: '#FDFDFE',
    },
    secondary: {
      main: '#59BA47',
    },
  },
  typography: {
    fontFamily:[
      'Lato',
      'Antipasto-ExtraLightTrial',
      'Antipasto-ExtraBoldTrial',
      'Antipasto-RegularTrial',
      'big_noodle.titling',
      'big_noodle_titling_oblique',
      'sans-serif'
    ]
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'blue', 
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'blue', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'gray', 
            },
            '&:hover fieldset': {
              borderColor: 'gray', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'blue', 
            },
          },
        },
      },
    },
  },
});

export default theme;