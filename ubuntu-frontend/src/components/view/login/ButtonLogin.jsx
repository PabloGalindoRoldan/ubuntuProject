import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";
import './ButtonLogin.css'

function ButtonLogin({ onClick }) {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            startIcon={<div className='login__button__icon__background'><FcGoogle /></div>}
            sx={{
                backgroundColor: theme.palette.primary.azul,
                color: 'white',
                fontFamily: 'Lato',
                borderRadius: '15px',
                textTransform: 'none',
            }}
            onClick={onClick}
        >
            Continua con Google
        </Button>
    );
}

export default ButtonLogin;