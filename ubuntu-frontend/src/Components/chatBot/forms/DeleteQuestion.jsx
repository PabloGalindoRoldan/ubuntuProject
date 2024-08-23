import { Box, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../theme/theme";
import ModalAlert from "../../shared/modalAlert/ModalAlert";

const DeleteQuestionForm = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState('');
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

    const handleDelete = async () => {
        if (!selectedQuestionId) {
            setModalTitle("Error");
            setModalSubTitle("Por favor, seleccione una pregunta.");
            setModalStatus("error");
            setModalOpen(true);
            return;
        }
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/questions/delete/${selectedQuestionId}`);
            setModalTitle("Éxito");
            setModalSubTitle("Pregunta eliminada con éxito!");
            setModalStatus("success");
            setSelectedQuestionId(''); 
        } catch (error) {
            console.error("Error deleting question:", error);
            setModalTitle("Error");
            setModalSubTitle("Hubo un error al eliminar la pregunta.");
            setModalStatus("error");
        } finally {
            setModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSuccessAction = () => {
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
                    marginBottom: "1rem", 
                    fontFamily: 'Lato', 
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Borrar Pregunta
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                <InputLabel>Pregunta</InputLabel>
                <Select
                    value={selectedQuestionId}
                    onChange={(e) => setSelectedQuestionId(e.target.value)}
                    label="Pregunta"
                >
                    {questions.map((question) => (
                        <MenuItem key={question.id} value={question.id}>
                            {question.questionText}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={handleDelete}
                sx={{
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
                Eliminar
            </Button>

            <ModalAlert
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                open={modalOpen}
                onClose={handleModalClose}
                onSuccessAction={handleSuccessAction}
                onTryAgain={() => {}}
            />
        </Box>
    );
};

export default DeleteQuestionForm;
