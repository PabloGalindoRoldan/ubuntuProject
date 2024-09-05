import { Box, IconButton, Input, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const ImageEdit = ({ images, onEditImage, onDeleteImage, onAddImage }) => {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [newImageName, setNewImageName] = useState(""); 
  const maxImages = 3;

  const handleFileChange = async (event) => {
    const fileArray = Array.from(event.target.files);
    const base64Array = [];

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1];

        base64Array.push({ file, base64: base64Image });

        if (base64Array.length === fileArray.length) {
          if (selectedImageId) {
            if (typeof onEditImage === "function") {
              onEditImage(selectedImageId, base64Array[0].base64);
              setSelectedImageId(null);
            }
          } else {
            if (typeof onAddImage === "function") {
              base64Array.forEach(({ base64, file }) => {
                onAddImage(base64, file.name);
              });
            }
          }
          setNewImageName("");
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditClick = (id) => {
    setSelectedImageId(id);
    document.getElementById('image-input').click(); 
  };

  const handleAddClick = () => {
    setSelectedImageId(null);
    document.getElementById('image-input').click(); 
  };

  const emptyBoxes = maxImages - images.length;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px', width: '90%' }}>
      {images.map((image, index) => (
        <Box key={image.id} sx={{ position: 'relative', width: '30%', height: '150px', bgcolor: image ? 'transparent' : 'grey.300' }}>
          {image.url ? (
            <img src={image.url} alt={`imagen-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Box sx={{ width: '100%', height: '100%' }}></Box>
          )}
          <IconButton
            aria-label="editar"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              left: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)', 
              color: 'white'
            }}
            onClick={() => handleEditClick(image.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              bgcolor: 'rgba(0, 0, 0, 0.5)', 
              color: 'white'
            }}
            onClick={() => onDeleteImage(image.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {[...Array(emptyBoxes)].map((_, index) => (
        <Box key={`empty-${index}`} sx={{ position: 'relative', width: '30%', height: '150px', bgcolor: 'grey.300', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton
            aria-label="agregar"
            sx={{ 
              width: '100%',
              height: '13vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              borderColor: 'red',
              color: 'black',
              fontSize: '0.65rem'
            }}
            onClick={handleAddClick}
          >
            AÑADIR IMAGEN
          </IconButton>
          {newImageName && (
            <Typography sx={{ fontSize: '0.8rem', mt: '10px', color: 'black', textAlign: 'center' }}>
              {newImageName}
            </Typography>
          )}
        </Box>
      ))}
      <Input
        type="file"
        id="image-input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </Box>
  );
};

export default ImageEdit;