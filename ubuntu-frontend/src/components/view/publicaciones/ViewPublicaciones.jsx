import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import PublicacionesCard from '../../cards/PublicacionesCard';
import SearchBar from '../../searchBar/SearchBar';
import imagenPublicaciones from '../../../assets/img/imagen publicaciones.jpg';
import './ViewPublicaciones.css';
import SvgMicroemp from '../../svg/MicroEmprSvg';
import { ServiceHttp } from '../../../utils/services/serviceHttp';

const ViewPublicaciones = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const publicacionesData = await new ServiceHttp("/publications/getAllPublications").get();
            publicacionesData.sort((a, b) => b.id - a.id);
            setData(publicacionesData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Box>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '55vh',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${imagenPublicaciones})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                }} />
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(9, 9, 9, 0.8)',
                    zIndex: 2,
                }} />
                <Box sx={{
                    position: 'relative',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingTop: '3vh',
                    paddingLeft: '2vh',
                    paddingRight: '2vh',
                }}>
                    <SearchBar />
                    <Box className='publicaciones__container__title'>
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '18px', lineHeight: '24px', fontWeight: 600 }}>PUBLICACIONES</Typography>
                    </Box>
                    <Box className='publicaciones__container__subTitle'>
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '28px', lineHeight: '32px', fontWeight: 500 }}>Explorando finanzas de impacto</Typography>
                    </Box>
                    <Box className='publicaciones__container__texto'>
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '24px', lineHeight: '32px', fontWeight: 400 }}>Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ position: "relative", zIndex: 10, marginTop: 5, }}>
                <SvgMicroemp />
                <Grid container spacing={2} sx={{ position: "relative", zIndex: 2 }}>
                    {data.map((publicacion, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <PublicacionesCard
                                id = {publicacion.id}
                                title={publicacion.title}
                                images={publicacion.images.map((item) => item.url)}
                                date={publicacion.createdDate}
                                text={publicacion.description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ViewPublicaciones;