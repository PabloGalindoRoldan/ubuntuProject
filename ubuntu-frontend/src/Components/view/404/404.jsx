import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { IoArrowUndo } from "react-icons/io5";


const Error = () => {

    const theme = useTheme();

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh", 
            textAlign: "center",
        }}>
            <Typography sx={{ typography: "h1", color: theme.palette.primary.azul,
                fontSize: "50px",
                fontFamily: "'sans-serif' ",
            }}>
                Ruta inexistente
            </Typography>
            <Typography className="text" sx={{ typography: "h3", 
                color: theme.palette.primary.azul,
                fontSize: "20px",
                marginTop: "2px",
                fontFamily: "'Lato' ",
                 }}>
                Por favor regrese al inicio
            </Typography>
            <button style={
                {
                    marginTop: "10px", border: "none", backgroundColor: "transparent",
                }
            }>
                <a href="/">
                <IoArrowUndo size={30} color={theme.palette.primary.azul} />
                </a>
            </button>
        </div>
    );
};

export default Error;
