import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ImageCarousel from '../shared/ImageCarousel';
import { useTheme } from '@mui/material/styles';
import './PublicacionesCard.css'

const PublicacionesCard = ({ title, images, date, text }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const theme = useTheme();

    const paragraphs = text.split('\n\n');
    const firstParagraph = paragraphs[0];
    const remainingParagraphs = paragraphs.slice(1);

    return (
        <Card sx={{
            maxWidth: 340,
            margin: '16px auto',
            paddingTop: '16px',
            paddingBottom: '8px',
            borderRadius: '16px',
            backgroundColor: theme.palette.primary.grisClaro,
        }}>
            <CardContent>
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
                <Button sx={{ color: 'black' }} onClick={handleExpandClick}>
                    {expanded ? 'Mostrar menos' : 'Leer más'}
                </Button>
            </CardContent>
        </Card>
    );
};

PublicacionesCard.propTypes = {
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default PublicacionesCard;