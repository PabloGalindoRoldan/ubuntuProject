import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Container, TextField } from "@mui/material";
import imageContact from "../../../assets/img/imagen contacto.jpg";
import SearchBar from "../../searchBar/SearchBar";
import ModalAlert from '../../shared/modalAlert/ModalAlert';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserContact = () => {
  const theme = useTheme();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
    microBusiness: { id: id || '' },
  });
  
  const [microBusinessName, setMicroBusinessName] = useState('');
  const [alertType, setAlertType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubTitle, setModalSubTitle] = useState('');

  useEffect(() => {
    const fetchMicroBusiness = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/microbusiness/${id}`);
        setMicroBusinessName(response.data.name); 
      } catch (error) {
        console.error("Error fetching microemprendimiento:", error);
      }
    };
    
    if (id) {
      fetchMicroBusiness();
    }
  }, [id]);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      microBusiness: { id: id || '' },
    }));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phoneNumber) => {
    return /^[0-9+\s]*$/.test(phoneNumber);
  };

  const allFieldsFilled = Object.values(formData).every(field =>
    typeof field === 'string' ? field.trim() !== '' : true
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (allFieldsFilled) {
      if (isValidEmail(formData.email) && isValidPhone(formData.phoneNumber)) {
        setIsSubmitting(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            setAlertType('success');
            setModalTitle('¡Mensaje enviado con éxito!');
            setModalSubTitle('Nos pondremos en contacto contigo pronto.');  
            setFormData({
              fullName: '',
              email: '',
              phoneNumber: '',
              message: '',
              microBusiness: { id: id || '' },
            });
  
            setOpenModal(true);
            setTimeout(() => {
              setOpenModal(false); 
            }, 3000);
          } else {
            throw new Error('Error en la respuesta del servidor');
          }
        } catch (error) {
          setAlertType('error');
          setModalTitle('Error al enviar el mensaje');
          setModalSubTitle('Inténtalo de nuevo más tarde.');
          setOpenModal(true);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setAlertType('error');
        setModalTitle('Error en la validación');
        setModalSubTitle('Por favor, verifica tu correo electrónico y número de teléfono.');
        setOpenModal(true);
      }
    } else {
      setAlertType('error');
      setModalTitle('Campos incompletos');
      setModalSubTitle('Por favor, completa todos los campos del formulario.');
      setOpenModal(true);
    }
  };

  return (
    <Container sx={{ padding: "0px" }}>
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          mb: 1,
          backgroundImage: `url(${imageContact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          pl: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            marginBottom: 6,
            marginTop: 3,
          }}
        >
          <SearchBar />
          <Typography
            sx={{
              fontFamily: "'Lato' ",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "24px",
              textAlign: "left",
              color: "white",
              marginTop: 4,
              marginBottom: 1,
            }}
          >
            CONTACTO
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Lato' ",
              fontWeight: "500",
              fontSize: "28px",
              lineHeight: "33px",
              textAlign: "left",
              marginTop: "2vh",
              color: "white",
              whiteSpace: "pre-wrap",
            }}
          >
            Contactanos para<br/>obtener<br />
            información<br />detallada sobre<br />cómo podés<br />
            invertir en un<br />futuro más<br />sostenible
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{
          textAlign: "center",
          marginBottom: 4,
          zIndex: 1,
          width: "100%"
        }}>
          <Typography
            sx={{
              fontFamily: "'Lato' ",
              fontWeight: "500",
              fontSize: "22px",
              lineHeight: "30px",
              textAlign: "center",
              color: "black",
              marginTop: "6vh",
              marginBottom: "32px",
            }}
          >
            Por favor, completá el formulario.
            Nos comunicaremos en breve.
          </Typography>
          <Typography sx={{
            fontFamily: "'Lato' ",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "25px",
            textAlign: "center",
            color: theme.palette.primary.azul,
          }}>
            {microBusinessName || 'Nombre del Microemprendimiento'}
          </Typography>
          <Typography sx={{
            fontFamily: "'Lato' ",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "25px",
            textAlign: "center",
            marginTop: "2vh",
          }}>
            Vas a contactar a {microBusinessName || 'Ubuntu'} para recibir más <br />
            información acerca del Microemprendimiento <br />
            seleccionado.
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2vh",
            marginBottom: "2vh",
          }}>
            <form onSubmit={handleSubmit} style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "80%",
              maxWidth: "600px",
              marginTop: "2vh",
              marginBottom: "2vh",
            }}>
              <TextField
                onChange={handleChange}
                value={formData.fullName}
                name="fullName"
                id="name"
                label="Nombre Completo*"
                variant="outlined"
                required
              />
              <TextField
                onChange={handleChange}
                value={formData.email}
                name="email"
                id="email"
                label="Correo Electrónico*"
                variant="outlined"
                type="email"
                required
              />
              <TextField
                onChange={handleChange}
                value={formData.phoneNumber}
                name="phoneNumber"
                id="phone"
                label="Teléfono*"
                variant="outlined"
                type="tel"
                required
              />
              <TextField
                onChange={handleChange}
                value={formData.message}
                name="message"
                id="message"
                label="Mensaje*"
                variant="outlined"
                multiline
                rows={4}
                required
              />
             <button
                  type="submit"
                  style={{
                    width: "20rem",
                    height: "56px",
                    borderRadius: "100px",
                    backgroundColor: allFieldsFilled ? theme.palette.primary.azul : theme.palette.primary.grisOscuro,
                    color: theme.palette.primary.main,
                    border: "none",
                    fontFamily: "'Lato' ",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "25px",
                    marginTop: "2vh",
                    transition: "background-color 0.3s ease",
                    cursor: allFieldsFilled ? "pointer" : "not-allowed",
                    '&:hover': allFieldsFilled ? {
                      backgroundColor: theme.palette.primary.verdeFuentes,
                           color: 'white',
                                          } : {},
                  }}
                  disabled={!allFieldsFilled || isSubmitting}
                >
                  Enviar
                </button>
            </form>
          </Box>
        </Box>
      </Box>
      {openModal && (
        <ModalAlert
          type={alertType}
          title={modalTitle}
          subTitle={modalSubTitle}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </Container>
  );
};

export default UserContact;
