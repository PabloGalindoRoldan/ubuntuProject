import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, FormHelperText, Button, CircularProgress } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalAlert from '../../../shared/modalAlert/ModalAlert';
import { ReusableButton } from '../../../shared';
import theme from '../../../../theme/theme';

const EditarPublicacion = ({ publicacion, onSuccess, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalStatus, setModalStatus] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalSubTitle, setModalSubTitle] = useState('');
    const [loadingImageId, setLoadingImageId] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const maxCharacters = 2000;

    useEffect(() => {
        if (publicacion) {
            setTitle(publicacion.title || '');
            setContent(publicacion.description || '');
            setImages(publicacion.images.map((item) => ({ url: item.url, id: item.id })) || []);
        }
    }, [publicacion]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && content) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/publications/updatepubs/${publicacion.id}`, {
                    title,
                    description: content,
                });
                setModalStatus('success');
                setModalTitle('Cambios guardados con exito');
                setModalSubTitle('');
                setOpenModal(true);
            } catch (error) {
                console.error('Error updating publication:', error);
                setModalStatus('error');
                setModalTitle('Lo sentimos, los cambios no pudieron ser guardados.');
                setModalSubTitle('Por favor, volvé a intentarlo');
                setOpenModal(true);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleContentChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setContent(e.target.value);
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleSuccess = () => {
        setOpenModal(false);
        onSuccess();
    };

    const handleTryAgain = () => {
        setOpenModal(false);
    };

    const handleAddImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                setLoadingImage(true);
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/images/uploadForPublication`, {
                            fileBase64: base64String,
                            publicationId: publicacion.id,
                        });

    
                        const { internalId, url } = response.data;
                        if (internalId) {
                            setImages((prevImages) => [...prevImages, { url, id: internalId }]);
                        } else {
                            console.error('No internalId returned in response');
                        }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                    } finally {
                        setLoadingImage(false);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleEditImage = async (imageId) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                setLoadingImageId(imageId);
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    
                    try {
                        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/images/updateBase64/${imageId}`, {
                            fileBase64: base64String,
                        });
    
                        const updatedImage = response.data;
                        setImages((prevImages) =>
                            prevImages.map((img) => (img.id === imageId ? { ...img, url: updatedImage.url } : img))
                        );
    
                    } catch (error) {
                        console.error('Error updating image:', error);
                    } finally {
                        setLoadingImageId(null);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleDeleteImage = async (imageId) => {
        if (!imageId) {
            console.error('Image ID is undefined or null');
            return;
        }
    
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/images/${imageId}`);
            setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const buttonsToRender = Math.max(3 - images.length, 0);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "3vh",
                paddingTop: "3vh",
                paddingLeft: "3vw",
                paddingRight: "3vw",
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontFamily: 'Lato',
                        fontSize: '28px',
                        fontWeight: '500',
                        lineHeight: '35px',
                    }}
                >
                    Edición de publicación
                </Typography>
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontFamily: 'Lato',
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '25px',
                        textAlign: 'center'
                    }}
                >
                    Modificá los datos de la publicación
                </Typography>
            </Box>

            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '500px',
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Título"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <FormHelperText sx={{ marginLeft: '2vw' }}>
                    Se visualizará en el título de la publicación
                </FormHelperText>

                <TextField
                    label="Contenido de la publicación"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={15}
                    value={content}
                    onChange={handleContentChange}
                    required
                    sx={{ marginTop: '2vh' }}
                />
                <FormHelperText sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '2vw', marginRight: '2vw' }}>
                    <span>Máximo 2000 caracteres</span>
                    <span>{`${content.length}/${maxCharacters}`}</span>
                </FormHelperText>

                <Box sx={{ marginTop: '2vh' }}>
                    {images.length > 0 && images.map((image, index) => (
                        <Box
                            key={`${image.url}-${index}`}
                            sx={{
                                position: 'relative',
                                marginTop: '2vh',
                                height: '13vh',
                            }}
                        >
                            {loadingImageId === image.id ? (
                                <CircularProgress
                                    sx={{
                                        position: 'absolute',
                                        top: '35%',
                                        left: '40%',
                                        transform: 'translate(-50%, -50%)',
                                        color: theme.palette.primary.azul,
                                    }}
                                />
                            ) : (
                                <>
                                    <Button
                                        onClick={() => handleEditImage(image.id)}
                                        sx={{
                                            position: 'absolute',
                                            height: '30px',
                                            width: '30px',
                                            minWidth: '30px',
                                            padding: '3px',
                                            top: 10,
                                            right: 50,
                                            display: 'flex',
                                            gap: '0.5rem',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            borderRadius: '50%',
                                            zIndex: 1,
                                        }}
                                    >
                                        <CreateIcon sx={{ color: 'white' }} />
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteImage(image.id)}
                                        sx={{
                                            position: 'absolute',
                                            height: '30px',
                                            width: '30px',
                                            minWidth: '30px',
                                            padding: '3px',
                                            top: 10,
                                            right: 10,
                                            display: 'flex',
                                            gap: '0.5rem',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            borderRadius: '50%',
                                            zIndex: 1,
                                        }}
                                    >
                                        <DeleteOutlineIcon sx={{ color: 'white' }} />
                                    </Button>
                                    <img
                                        src={image.url}
                                        alt={`Publicación Imagen ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                    ))}

                    {buttonsToRender > 0 && [...Array(buttonsToRender)].map((_, index) => (
                        <Box key={index} sx={{ position: 'relative', marginTop: '2vh', height: '13vh' }}>
                            {loadingImage ? (
                                <CircularProgress
                                    sx={{
                                        position: 'absolute',
                                        top: '35%',
                                        left: '40%',
                                        transform: 'translate(-35%, -45%)',
                                        color: theme.palette.primary.azul,
                                    }}
                                />
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={handleAddImage}
                                    sx={{
                                        width: '100%',
                                        height: '13vh',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '5px',
                                        borderColor: 'black',
                                        color: 'black',
                                    }}
                                >
                                    Añadir Imagen
                                </Button>
                            )}
                        </Box>
                    ))}
                </Box>

                <ReusableButton nombre="Guardar cambios" type="submit" />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onCancel}
                    sx={{
                        backgroundColor: "#FF9691",
                        width: "95%",
                        maxWidth: "350px",
                        minWidth: "255px",
                        height: "40px",
                        marginBottom: "5vh",
                        textTransform: "none",
                        fontFamily: "Lato",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        borderRadius: "30px",
                        "&:hover": {
                            backgroundColor: theme.palette.error.dark,
                        },
                    }}
                >
                    Cancelar
                </Button>

            </Box>
            <ModalAlert
                open={openModal}
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                onClose={handleModalClose}
                onSuccessAction={handleSuccess}
                onTryAgain={handleTryAgain}
            />
        </Box>
    );
};

export default EditarPublicacion;