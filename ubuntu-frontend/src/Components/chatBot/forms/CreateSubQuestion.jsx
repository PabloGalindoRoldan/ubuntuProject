import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import theme from '../../../theme/theme';
import ModalAlert from "../../shared/modalAlert/ModalAlert";

const SubQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState('');
    const [subQuestion, setSubQuestion] = useState('');
    const [subAnswer, setSubAnswer] = useState('');
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
                console.error('Error al obtener las preguntas principales:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleCreateSubQuestion = async (event) => {
        event.preventDefault();

        const subQuestionDTO = {
            questionText: subQuestion,
            hierarchyDescription: 'GENERAL',
            active: true,
            answers: [
                {
                    answerText: subAnswer
                }
            ]
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/questions/create/${selectedQuestionId}/subquestion`,
                subQuestionDTO
            );

            if (response.status === 201) {
                setModalTitle("Éxito");
                setModalSubTitle("Subpregunta y subrespuesta creadas con éxito!");
                setModalStatus("success");
                setSubQuestion('');
                setSubAnswer('');
            }
        } catch (error) {
            setModalTitle("Error");
            setModalSubTitle("Hubo un error al crear la subpregunta y subrespuesta.");
            setModalStatus("error");
        } finally {
            setModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSuccessAction = () => {
        handleModalClose();
    };

    const handleTryAgain = () => {
        handleModalClose(true);
    };

    return (
        <form
            style={{ marginTop: '1.5rem' }}
            noValidate
            autoComplete="off"
            onSubmit={handleCreateSubQuestion}
        >
            <Typography
                variant="h6"
                sx={{
                    marginBottom: '1rem',
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    color: theme.palette.primary.azul,
                    textAlign: 'center',
                }}
            >
                Crear Nueva Subpregunta y Subrespuesta
            </Typography>

            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <InputLabel id="select-question-label">Pregunta Principal</InputLabel>
                <Select
                    labelId="select-question-label"
                    value={selectedQuestionId}
                    onChange={(e) => setSelectedQuestionId(e.target.value)}
                    label="Pregunta Principal"
                >
                    {questions.map((question) => (
                        <MenuItem key={question.id} value={question.id}>
                            {question.questionText}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Subpregunta"
                variant="outlined"
                margin="normal"
                value={subQuestion}
                onChange={(e) => setSubQuestion(e.target.value)}
            />
            <TextField
                fullWidth
                label="Subrespuesta"
                variant="outlined"
                margin="normal"
                value={subAnswer}
                onChange={(e) => setSubAnswer(e.target.value)}
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
                Crear Subpregunta
            </Button>

            <ModalAlert
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                open={modalOpen}
                onClose={handleModalClose}
                onSuccessAction={handleSuccessAction}
                onTryAgain={handleTryAgain}
            />
        </form>
    );
};

export default SubQuestions;
