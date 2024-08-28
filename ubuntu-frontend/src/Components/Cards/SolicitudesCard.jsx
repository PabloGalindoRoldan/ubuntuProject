import { Card, CardContent, Button, Box, Divider } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from "@mui/material/styles";
import "./SolicitudesCard.css";

const SolicitudesCard = ({ title, microBusinessId, dateCreated, dateUpdated, status, name, surname, email, phone, text, onButtonClick }) => {
    const theme = useTheme();
    const className = status === false ? "solicitudesCard__orangeDot" : "solicitudesCard__greenDot";
    const date = status === false ? dateCreated : dateUpdated

    return (
        <Card sx={{
            width: 'auto',
            paddingTop: '8px',
            paddingBottom: '8px',
            borderRadius: '16px',
            backgroundColor: theme.palette.primary.grisClaro,
            boxShadow: 'none',
            justifySelf: 'center',
            margin: '0 0 2vh 0'
        }}>
            <CardContent sx={{
                display: 'grid',
                gridTemplateColumns: '11fr 1fr',
                alignItems: 'center',
                padding: '8px 8px 8px 16px !important',
            }}>
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px' 
                }}>
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center' 
                    }}>
                        <Box className={className} />
                        <Box sx={{ 
                            fontFamily: 'Lato',
                            fontWeight: '600',
                            fontSize: '18px',
                            color: theme.palette.primary.azul
                        }}>
                            {title}
                        </Box>
                    </Box>
                    <Divider sx={{ 
                        borderColor: theme.palette.primary.azul,
                        width: '75%',
                        borderBottomWidth: '2px',
                        borderStyle: 'solid', 
                    }} />
                    <Box sx={{ 
                        fontFamily: 'Lato',
                        fontWeight: '400',
                        fontSize: '18px'
                    }}>
                        {date}
                    </Box>
                </Box>
                <Box>
                    <Button sx={{ 
                        color: theme.palette.primary.azul,
                        textTransform: 'none',
                        minWidth: '24px'
                    }}
                    onClick={() => 
                        onButtonClick({ title, microBusinessId, dateCreated, dateUpdated, status, name, surname, email, phone, text })
                    }>
                        <ArrowForwardIosIcon />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SolicitudesCard;