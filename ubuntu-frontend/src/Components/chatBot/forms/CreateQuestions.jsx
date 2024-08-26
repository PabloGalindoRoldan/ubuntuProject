import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import SubQuestions from "./CreateSubQuestion";
import ModalAlert from "../../shared/modalAlert/ModalAlert";

const CreateQuestionsForm = () => {
    const theme = useTheme();
    
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("success");
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubTitle, setModalSubTitle] = useState("");

    const handleCreateQuestion = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/questions/create`, {
                questionText: question, 
                hierarchyDescription: "GENERAL",
                active: true,
                answers: []
            });
            return response.data.id;
        } catch (error) {
            console.error("Error al crear la pregunta:", error);
            throw error;
        }
    };

    const handleCreateAnswer = async (questionId) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/answers/create`, {
                answerText: answer,
                questionId: questionId 
            });
        } catch (error) {
            console.error("Error al crear la respuesta:", error);
            throw error;
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const questionId = await handleCreateQuestion(); 
            await handleCreateAnswer(questionId); 
    
            setModalTitle("Éxito");
            setModalSubTitle("Pregunta y respuesta creadas con éxito!");
            setModalStatus("success");
        } catch (error) {
            setModalTitle("Error");
            setModalSubTitle("Hubo un error al crear la pregunta y respuestas.");
            setModalStatus("error");
        } finally {
            setModalOpen(true);
            setQuestion("");
            setAnswer("");
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalSuccess = () => {
        handleModalClose(true);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 12,
                padding: "2rem",
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 3,
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    marginBottom: "1rem", 
                    fontFamily: 'Lato', 
                    fontWeight: "bold",
                    color: theme.palette.primary.azul,
                    textAlign: "center",
                }}
            >
                Crear Nueva Pregunta y Respuesta
            </Typography>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                style={{ width: "100%", maxWidth: "400px" }}
            >
                <TextField
                    fullWidth
                    label="Pregunta"
                    variant="outlined"
                    margin="normal"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Respuesta"
                    variant="outlined"
                    margin="normal"
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2,
                        backgroundColor: theme.palette.primary.azul,
                         color: 'white',
                         fontFamily: 'Lato',
                         borderRadius: '10px',
                         textTransform: 'none',
                         padding: '0.5rem 1rem',
                         '&:hover': {
                           backgroundColor: theme.palette.primary.verdeFuentes,
                           color: 'white',
                         }
                        }}
                >
                    Crear Pregunta
                </Button>
            </form>
            <Box sx={{
                marginTop: "2rem",
                width: "100%",
                maxWidth: "400px",
            }}>
                <SubQuestions />
            </Box>
            <ModalAlert
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                open={modalOpen}
                onClose={handleModalClose}
                onSuccessAction={handleModalSuccess}
            />
        </Box>
    );
};

export default CreateQuestionsForm;
