import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, FormHelperText, Button } from '@mui/material';
import { ReusableButton } from '../../../shared';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalAlert from '../../../shared/modalAlert/ModalAlert';
import theme from '../../../../theme/theme';

const EditarPublicacion = ({ publicacion, onSuccess, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalStatus, setModalStatus] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalSubTitle, setModalSubTitle] = useState('');
    const maxCharacters = 2000;

    useEffect(() => {
        if (publicacion) {
            setTitle(publicacion.title || '');
            setContent(publicacion.description || '');
            setImages(publicacion.images.map((item) => item.url) || []);
        }
    }, [publicacion]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && content) {
            try {
                const response = await axios.put(`http://localhost:8080/api/v1/publications/updatepubs/${publicacion.id}`, {
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
                setModalTitle('Lo sentimos, los cambios no pudieron ser gaurdados.');
                setModalSubTitle('Por favor, volvé a intentarlo');
                setOpenModal(true);
            }
        } else {
            console.log('Please fill in all required fields.');
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
        // Functionality to add an image
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
                            key={`${image}-${index}`}
                            sx={{
                                position: 'relative',
                                marginTop: '2vh',
                                height: '13vh',
                            }}
                        >
                            <Button sx={{ position: 'absolute', height: '30px', width: '30px', minWidth: '30px', padding: '3px', top: 10, right: 50, display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%' }}>
                                <CreateIcon sx={{ color: 'white' }} />
                            </Button>
                            <Button sx={{ position: 'absolute', height: '30px', width: '30px', minWidth: '30px', padding: '3px', top: 10, right: 10, display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%' }}>
                                <DeleteOutlineIcon sx={{ color: 'white' }} />
                            </Button>
                            <img
                                src={image}
                                alt={`Publicación Imagen ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '5px'
                                }}
                            />
                        </Box>
                    ))}

                    {[...Array(buttonsToRender)].map((_, index) => (
                        <Button
                            key={index}
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
                                marginTop: '2vh'
                            }}
                        >
                            Añadir Imagen
                        </Button>
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
                        borderRadius: "100px",
                        mt: "0px",
                        mb: "48px",
                        zIndex: 1,
                        "&:hover": {
                            backgroundColor: "#AA9998",
                        },
                    }}
                >
                    <Typography
                        variant="p"
                        sx={{
                            textTransform: "none",
                            color: theme.palette.primary.blanco,
                            fontFamily: "Lato",
                            fontWeight: "700",
                            fontSize: "16px",
                        }}
                    >
                        Cancelar
                    </Typography>
                </Button>
            </Box>

            <ModalAlert
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                open={openModal}
                onClose={handleModalClose}
                onSuccessAction={handleSuccess}
                onTryAgain={handleTryAgain}
            />
        </Box>
    );
};

export default EditarPublicacion;