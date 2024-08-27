import  { useState, useContext } from 'react';
import { Box, Typography, TextField, FormHelperText, Button, Tooltip } from '@mui/material';
import { ReusableButton } from '../../../shared';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
import theme from '../../../../theme/theme';
import AuthContext from '../../../../token/auth/AuthProvider';
import UbuntuLoader from '../../../shared/ubuntuLoader/UbuntuLoader'; 
import { useNavigate } from 'react-router-dom';
import ModalAlert from '../../../shared/modalAlert/ModalAlert'; 

const CrearPublicacion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imageBase64, setImageBase64] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); 
    const [modalStatus, setModalStatus] = useState('success'); 
    const [modalTitle, setModalTitle] = useState(''); 
    const [modalSubTitle, setModalSubTitle] = useState(''); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const maxCharacters = 2000;

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
    
        if (files.length > 3) {
            alert('You can only upload up to 3 images.');
            return;
        }
    
        const base64Images = [];
        const imageNames = [];
    
        for (const file of files) {
            if (file.size > 3 * 1024 * 1024) {
                alert('Each image must be less than 3MB.');
                return;
            }
    
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                base64Images.push(base64);
                imageNames.push(file.name);
    
                if (base64Images.length === files.length) {
                    setImageBase64(base64Images);
                    setImageFiles(imageNames);
                }
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && content) {
            setLoading(true); 
            try {
                const payload = {
                    user: { id: user.id },
                    title: title,
                    description: content,
                    images: [],
                };

                const url = `${import.meta.env.VITE_API_BASE_URL}/publications/createPublication`;
                const response = await axios.post(url, payload);
                const publicationId = response.data.id;

                if (publicationId && imageBase64.length > 0) {
                    await uploadImages(publicationId);
                }

                setModalStatus('success');
                setModalTitle('Publicación creada exitosamente');
                setModalSubTitle('');
                setModalOpen(true);

            } catch (error) {
                setModalStatus('error');
                setModalTitle('Lo sentimos, la publicación no pudo ser creada.');
                setModalSubTitle('Por favor, volvé a intentarlo');
                setModalOpen(true);
                console.error('Error creating publication:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.log('Please fill in all required fields.');
        }
    };

    const uploadImages = async (publicationId) => {
        try {
            const uploadPromises = imageBase64.map((base64) =>
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/images/uploadForPublication`, {
                    fileBase64: base64,
                    publicationId: publicationId,
                })
            );
            await Promise.all(uploadPromises);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleContentChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setContent(e.target.value);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        if (modalStatus === 'success') {
            navigate('/admin/publicaciones');
        }
    };

    const handleTryAgain = () => {
        setModalOpen(false);
    };

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
            {loading && <UbuntuLoader />}
            <Box>
                <Typography
                    sx={{
                        fontFamily: 'Lato',
                        fontSize: '28px',
                        fontWeight: '500',
                        lineHeight: '35px',
                    }}
                >
                    Carga de publicación
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
                    Completa los datos para crear una nueva publicación
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
                    label="Ingresá el contenido de la publicación"
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

                <Box sx={{ mt: "20px", width: "90%", display: "flex", justifyContent: "flex-end" }}>
                    <Box>
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

                        <Typography sx={{ fontSize: '14px', maxWidth: "152px", minWidth: "152px" }}>
                            *Requerida al menos una imagen<br />
                            Hasta 3 imágenes. Máximo 3Mb cada una
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                            {imageFiles.length > 0 ? (
                                imageFiles.map((name, index) => (
                                    <Tooltip title={name} key={index} arrow>
                                        <Typography 
                                            sx={{ 
                                                fontSize: '14px', 
                                                maxWidth: "152px", 
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis', 
                                                color: "red" 
                                            }} 
                                        >
                                            Archivo: {name}
                                        </Typography>
                                    </Tooltip>
                                ))
                            ) : (
                                <Typography sx={{ fontSize: '14px', color: "gray" }}>
                                    Seleccione una Imagen
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>

                <ReusableButton nombre="Crear publicación" type="submit" />
            </Box>

            <ModalAlert
                open={modalOpen}
                handleClose={handleModalClose}
                onSuccessAction={handleModalClose}
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                onTryAgain={handleTryAgain}
            />
        </Box>
    );
};

export default CrearPublicacion;