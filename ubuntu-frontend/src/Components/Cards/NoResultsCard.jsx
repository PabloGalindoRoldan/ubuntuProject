import { Card, CardContent, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NoResultsCard = () => {

    const theme = useTheme();

    return (
        <Card sx={{
            width: '96vw',
            maxWidth: 340,
            margin: '8vh auto',
            paddingTop: '24px',
            paddingBottom: '24px',
            borderRadius: '8px',
            backgroundColor: theme.palette.primary.grisClaro,
            boxShadow: 'none',
            justifySelf: 'center'
        }}>
            <CardContent sx={{
                padding: '0'
            }} >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '16px',
                        padding: '0',

                    }}>
                    <SearchOffIcon 
                        sx={{
                            color: `${theme.palette.primary.azul}`, 
                            width: '40px', 
                            height: 'auto' 
                        }} />
                    <Box>
                        <Typography sx={{fontFamily: 'Lato', fontWeight: 600, fontSize: '18px', lineHeight: '25px', textAlign: 'center', color: `${theme.palette.primary.azul}`,}}>No se encontraron resultados para tu búsqueda</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{fontFamily: 'Lato', fontWeight: 500, fontSize: '16px', lineHeight: '20px', textAlign: 'center', color: `${theme.palette.primary.black}`,}}>Intentá nuevamente con otra consulta</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NoResultsCard;
