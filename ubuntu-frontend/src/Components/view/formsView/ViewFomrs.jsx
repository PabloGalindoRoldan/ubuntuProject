import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import CreateQuestionsForm from "../../chatBot/forms/CreateQuestions";
import EditQuestionForm from "../../chatBot/forms/EditQuestionForm";
import DeleteQuestionForm from "../../chatBot/forms/DeleteQuestion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import theme from "../../../theme/theme";

const ChatbotForms = () => {
    const [selectedForm, setSelectedForm] = useState(null);

    const renderForm = () => {
        switch (selectedForm) {
            case "create":
                return <CreateQuestionsForm />;
            case "edit":
                return <EditQuestionForm />;
            case "delete":
                return <DeleteQuestionForm />;
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "2rem",
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                    marginTop: "1rem",
                    fontFamily: "Lato",
                }}
            >
                Administrador de Chatbot
            </Typography>

            {selectedForm ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1rem",
                        cursor: "pointer",
                    }}
                >
                    <IconButton onClick={() => setSelectedForm(null)}>
                        <ArrowBackIcon sx={{ color: theme.palette.primary.azul }} />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontFamily: "Lato", fontWeight: "bold" }}>
                        Volver
                    </Typography>
                </Box>
            ) : (
                <>
                    <Typography
                        variant="h2"
                        sx={{
                            marginTop: "0.5rem",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            fontFamily: "Lato",
                        }}
                    >
                        Seleccione una opción:
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "3rem",
                                gap: "1rem",
                            }}
                        >
                            <Button
                                sx={buttonStyles}
                                onClick={() => setSelectedForm("create")}
                            >
                                Crear Pregunta o Respuesta
                            </Button>
                            <Button
                                sx={buttonStyles}
                                onClick={() => setSelectedForm("edit")}
                            >
                                Editar Pregunta o Respuesta
                            </Button>
                            <Button
                                sx={buttonStyles}
                                onClick={() => setSelectedForm("delete")}
                            >
                                Eliminar Pregunta o Respuesta
                            </Button>
                        </Box>
                    </Box>
                </>
            )}

            <Box sx={{ marginTop: "2rem", width: "100%" }}>
                {renderForm()}
            </Box>
        </Box>
    );
};

const buttonStyles = {
    width: "100%",
    maxWidth: "500px",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: theme.palette.primary.azul,
    color: "#fff",
    "&:hover": {
        backgroundColor: theme.palette.primary.verdeFuentes,
        color: "#fff",
    },
    fontFamily: "Lato",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "none",
    padding: "1rem",
    borderRadius: "0.8rem",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

export default ChatbotForms;
