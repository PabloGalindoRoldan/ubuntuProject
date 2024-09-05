import { Box, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from "react";
import { ServiceHttp } from "../../../../../utils/services/serviceHttp";

const PerfilEstadisticas = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const publicacionesData = await new ServiceHttp("/publications/getAllPublications").get();
        setPublicaciones(publicacionesData);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    fetchPublicaciones();
  }, []);

  const styleTitle = {
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: "22px",
    lineHeight: "30px",
    mb: "42px",
    
  };

  return (
    <Box sx={{  width: "92vw", marginBottom: "30px" }}>
      <Typography
        variant="h6"
        component="h6"
        align="center"
        mt={4}
        sx={styleTitle}
      >
        Visualizaciones por Publicación
      </Typography>

      {publicaciones.map((publicacion) => (
        <Box
          key={publicacion.id}
          sx={{
            border: "1px solid #003459",
            borderRadius: "8px",
            padding: "12px 16px",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "400px",
            margin: "20px auto", // Ajuste del margen similar al que tienen las categorías
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {publicacion.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(publicacion.createdDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <VisibilityIcon sx={{ color: "#003459", mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#003459" }}>
              {publicacion.viewCount}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PerfilEstadisticas;
