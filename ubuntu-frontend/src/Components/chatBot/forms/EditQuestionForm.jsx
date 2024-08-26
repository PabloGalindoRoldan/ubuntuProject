import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../theme/theme";
import ModalAlert from "../../shared/modalAlert/ModalAlert";

const EditQuestionForm = () => {
    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("success");
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubTitle, setModalSubTitle] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/questions/all`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    const handleInputChange = (questionIndex, answerIndex, field, value) => {
        const updatedQuestions = [...questions];
        if (answerIndex !== null) {
            updatedQuestions[questionIndex].answers[answerIndex][field] = value;
        } else {
            updatedQuestions[questionIndex][field] = value;
        }
        setQuestions(updatedQuestions);
    };

    const handleSave = async (questionId, answerId, questionIndex, answerIndex) => {
        try {
            if (answerId) {
                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/answers/update/${answerId}`, questions[questionIndex].answers[answerIndex]);
            } else {
                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/questions/update/${questionId}`, questions[questionIndex]);
            }
            setModalTitle("Éxito");
            setModalSubTitle("Actualización exitosa!");
            setModalStatus("success");
        } catch (error) {
            setModalTitle("Error");
            setModalSubTitle("Hubo un error al actualizar.");
            setModalStatus("error");
        } finally {
            setModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalSuccess = () => {
        handleModalClose(true);
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
        }}>
            <Typography 
                variant="h6" 
                sx={{ 
                    marginBottom: "2rem", 
                    fontFamily: 'Lato', 
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Editar Preguntas y Respuestas
            </Typography>
            <Box component={Paper} sx={{ width: "100%", overflowX: "auto", padding: "1rem" }}>
                {questions.map((question, questionIndex) => (
                    <Box key={question.id} sx={{ marginBottom: "1.5rem", borderBottom: "1px solid #ddd", paddingBottom: "2rem" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Pregunta"
                                    value={question.questionText || ""}
                                    onChange={(e) => handleInputChange(questionIndex, null, 'questionText', e.target.value)}
                                />
                            </Grid>
                            {question.answers && question.answers.map((answer, answerIndex) => (
                                <Grid key={answer.id} item xs={12} sx={{
                                    gap: "1rem",
                                    display: "grid",
                                }}>
                                    <TextField
                                        fullWidth
                                        label="Respuesta"
                                        value={answer.answerText || ""}
                                        onChange={(e) => handleInputChange(questionIndex, answerIndex, 'answerText', e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => handleSave(question.id, answer.id, questionIndex, answerIndex)}
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
                                        Guardar Respuesta
                                    </Button>
                                </Grid>
                            ))}
                            <Grid item xs={12} sx={{
                                gap: "1rem",
                                display: "grid",
                            }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleSave(question.id, null, questionIndex, null)}
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
                                    Guardar Pregunta
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
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

export default EditQuestionForm;
