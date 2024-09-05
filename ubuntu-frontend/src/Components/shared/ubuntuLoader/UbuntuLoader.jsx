import { Box, Typography, useTheme } from "@mui/material";

import logoUbuntu from "../../../assets/img/logo card ingreso registro.png";

const UbuntuLoader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "380px",
          height: "480px",
          backgroundColor: theme.palette.primary.grisClaro,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            mb: "70px",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.2)",
              },
              "100%": {
                transform: "scale(1)",
              },
            },
          }}
        >
          <img
            src={logoUbuntu}
            alt="logo ubuntu cargando"
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ color: theme.palette.primary.azul }}>
            Cargando
          </Typography>
          <Box
            sx={{
              display: "flex",
              ml: "2px",
              "& span": {
                animation: "blink 1.5s steps(1, end) infinite",
                fontSize: "25px",
                lineHeight: "25px",
                color: theme.palette.primary.azul,
              },
              "& span:nth-of-type(2)": {
                animationDelay: "0.5s",
              },
              "& span:nth-of-type(3)": {
                animationDelay: "1s",
              },
              "@keyframes blink": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          >
            <Typography component="span">.</Typography>
            <Typography component="span">.</Typography>
            <Typography component="span">.</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UbuntuLoader;
