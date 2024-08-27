import { Box, IconButton, Input } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const ImageEdit = ({ images, onEditImage, onDeleteImage }) => {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  const handleFileChange = async (event) => {
    if (selectedImageId && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        await onEditImage(selectedImageId, base64Image);
        setSelectedImageId(null); 
        setNewImageFile(null); 
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (id) => {
    setSelectedImageId(id);
    document.getElementById('image-input').click(); 
  };

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
          <Input
            type="file"
            id="image-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ImageEdit;