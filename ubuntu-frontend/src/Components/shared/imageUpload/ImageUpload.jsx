import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import UploadIcon from '@mui/icons-material/Upload'; 
import { useTheme } from "@mui/material/styles";
import { ServiceUploadImage } from '../../../utils/ServiceImage'; 

const ImageUpload = ({ microBusinessId }) => {
  const [imageNames, setImageNames] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [error, setError] = useState("");
  const theme = useTheme();


  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > 3) {
      setError("Puedes subir hasta 3 imágenes.");
      return;
    }

    for (let file of fileArray) {
      if (file.size > 3 * 1024 * 1024) {
        setError("Cada imagen debe ser menor a 3MB.");
        return;
      }
    }

    setImageNames(fileArray.map(file => file.name));
    setError("");

    const base64Array = [];
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; 
        base64Array.push({ file, base64: base64Image });
        if (base64Array.length === fileArray.length) {
          setBase64Images(base64Array);
          base64Array.forEach(image => console.log(image.base64));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!microBusinessId) {
      setError("Primero debes crear el microemprendimiento.");
      return;
    }

    const token = sessionStorage.getItem('token'); 
    console.log('Token recuperado:', token); 

    if (!token) {
      setError("No se encontró el token de autenticación.");
      return;
    }

    try {
      for (let image of base64Images) {
        console.log("Objeto que envío al servidor:", { fileBase64: image.base64, microBusinessId });
        const response = await ServiceUploadImage(image.base64, microBusinessId, token);
        console.log('Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
      setError("Hubo un error al subir las imágenes. Inténtalo de nuevo.");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Button
        variant="contained"
        startIcon={<UploadIcon />}
        component="label"
        sx={{
          backgroundColor: "#093C59",
          width: "95%",
          maxWidth: "152px",
          minWidth: "152px",
          height: "40px",
          borderRadius: "100px",
          mb: "15px",
          zIndex: 1,
          "&:hover": {
            backgroundColor: theme.palette.primary.azul,
          },
          textTransform: "none",
          color: "white",
          fontFamily: "Lato",
          fontWeight: "700",
          fontSize: "14px",
        }}
      >
        Subir Imágen
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </Button>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#093C59",
          width: "95%",
          maxWidth: "152px",
          minWidth: "152px",
          height: "40px",
          borderRadius: "100px",
          mb: "15px",
          zIndex: 1,
          "&:hover": {
            backgroundColor: theme.palette.primary.azul,
          },
          textTransform: "none",
          color: "white",
          fontFamily: "Lato",
          fontWeight: "700",
          fontSize: "14px",
        }}
      >
        Enviar Imágenes
      </Button>
      {error && (
        <Typography sx={{ mt: 1, textAlign: 'center', fontSize: '12px', color: 'red' }}>
          {error}
        </Typography>
      )}
      <Typography sx={{ fontSize: '14px', maxWidth: "152px", minWidth: "152px" }}>
        *Requerida al menos una imagen<br />
        Hasta 3 imágenes. Máximo 3Mb cada una
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        {imageNames.map((name, index) => (
          <Typography key={index} sx={{ fontSize: '12px', wordBreak: 'break-all' }}>
            {name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ImageUpload;
