import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function Unauthorized() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box
            sx={{
                height: "93vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: "20%",
                textAlign: "center",
            }}
        >
            <Typography sx={{
                fontWeight: "600"
            }}>
                El usuario no está autorizado como administrador. Contacte a un administrador.
            </Typography>
        </Box>
    );
}

export default Unauthorized;