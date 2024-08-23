import { useContext, useState } from "react";
import { Card, CardContent, Button, Box } from "@mui/material";
import { ImageCarousel } from "../shared";
import { useTheme } from "@mui/material/styles";
import "./PublicacionesCard.css";
import axios from "axios";
import AuthContext from "../../token/auth/AuthProvider";

const PublicacionesCard = ({ title, images, date, text, id }) => {


    const [expanded, setExpanded] = useState(false);
    const {user} = useContext(AuthContext);

    const handleExpandClick = async () => {
        if (!expanded) { 
            if (!user) {
                try {
                const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/publications/getAllPublications/${id}`;
                    await axios.get(apiUrl);
                } catch (error) {
                    console.error('Error updating viewCount:', error);
                }
            }
        }
        setExpanded(!expanded);
    };

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
            justifySelf: 'center'
        }}>
            <CardContent >
                <Box className='publicacionesCard__container__title'>
                    {title}
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

export default PublicacionesCard;
