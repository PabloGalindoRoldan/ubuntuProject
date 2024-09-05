import { useState } from "react";
import { Card, CardContent, Button, Box, Grow, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ImageCarousel } from "../../../shared";
import { useTheme } from "@mui/material/styles";
import "../../../cards/PublicacionesCard.css";
import PublicacionesAdminOptionBox from "./PublicacionesAdminOptionBox";

const PublicacionesAdminCard = ({ title, images, date, text, cardId, focusedCardId, setFocusedCardId, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEdit = () => {
        onEdit(cardId);
    };

    const handleFocus = () => {
        if (focusedCardId === cardId) {
            setFocusedCardId(null);
        } else {
            setFocusedCardId(cardId);
        }
    };

    const handleOcultar = () => {
        onDelete(cardId);
    };

    const isFocused = focusedCardId === cardId;

    const theme = useTheme();

    const paragraphs = text.split("\n\n");
    const firstParagraph = paragraphs[0];
    const remainingParagraphs = paragraphs.slice(1);

    return (
        <Card sx={{
            width: '96vw',
            maxWidth: 340,
            margin: '2vw auto',
            paddingTop: '16px',
            paddingBottom: '8px',
            borderRadius: '16px',
            backgroundColor: theme.palette.primary.grisClaro,
            boxShadow: 'none',
            justifySelf: 'center',
            position: 'relative'
        }}>
            <Grow in={isFocused} timeout={10}>
                <Box>
                    <PublicacionesAdminOptionBox 
                        setFocusedCardId={setFocusedCardId} 
                        onEdit={handleEdit}
                        setFocused={handleFocus} 
                        onOcultar={handleOcultar} 
                    />
                </Box>
            </Grow>

            <CardContent>
                <Box className='publicacionesCard__container__title' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {title}
                    <IconButton
                        sx={{
                            height: "24px",
                            width: "24px",
                            backgroundColor: isFocused ? theme.palette.primary.azul : "transparent",
                            "&:hover": {
                                backgroundColor: isFocused ? theme.palette.primary.azul : theme.palette.primary.grisMedio,
                            },
                            "& .MuiSvgIcon-root": {
                                color: isFocused ? theme.palette.primary.main : theme.palette.primary.negro,
                            },
                        }}
                        onClick={handleFocus}
                    >
                        <MoreVertIcon
                            sx={{
                                height: "20px",
                                color: theme.palette.primary.negro,
                            }}
                        />
                    </IconButton>
                </Box>
                <ImageCarousel images={images} />
                <Box className='publicacionesCard__container__date'>
                    {date}
                </Box>
                <Box className='publicacionesCard__container__text'>
                    {firstParagraph}
                </Box>
                {expanded && (
                    remainingParagraphs.map
                        (
                            (item, i) =>
                                <Box key={i} className='publicacionesCard__container__text'>
                                    {item}
                                </Box>
                        )
                )}
                <Box className='publicacionesCard__container__button'>
                    <Button sx={{ color: theme.palette.primary.azul, textTransform: 'none', }} onClick={handleExpandClick}>
                        {expanded ? 'Ver menos' : 'Ver más'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PublicacionesAdminCard;