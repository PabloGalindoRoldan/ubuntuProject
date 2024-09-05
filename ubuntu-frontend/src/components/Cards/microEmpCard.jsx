import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Collapse,
  Button,
  useTheme,
  Divider,
  Box, 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ImageCarousel } from "../shared";

const ExpandMoreButton = styled(({ expand, ...other }) => {
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCard = ({
  id,  
  images,
  title,
  subtitle,
  category ,
  location,
  details,
  moreInf,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme(); 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleContactClick = () => {    
    if (id) {
      navigate(`/contacto/${id}`); 
    } else {
      console.error("ID es undefined");
    }
  };
  

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.grisClaro,
        borderRadius: "16px",
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        margin:"2vw"
      }}
    >
      <CardContent>
      <ImageCarousel images={images} />
        <Typography
          color={theme.palette.primary.negro}
          sx={{
            fontFamily: "'Lato' ",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px",
            marginBottom: "4px",
          }}
        >
          {title}
        </Typography>

        <Typography
          color={theme.palette.primary.azul}
          sx={{
            fontFamily: "'Lato' ",
            fontWeight: "700",
            fontSize: "14px",
            lineHeight: "18px",
            marginBottom: "4px",
          }}
        >
          {subtitle}
        </Typography>

        <Typography
          color={theme.palette.primary.negro}
          sx={{
            fontFamily: "'Lato' ",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "18px",
          }}
        >
          {category}
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <LocationOnIcon
            sx={{ width: "20px", marginRight: "8px" }}
          />
          <Typography
            color={theme.palette.primary.negro}
            sx={{
              fontFamily: "'Lato'",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            {location}
          </Typography>
        </Box>
      </CardContent>

      {!expanded && (
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              backgroundColor: theme.palette.primary.grisClaro,
              color: theme.palette.primary.azul,
            }}
          >
            <ExpandMoreIcon
              sx={{
                fontSize: "50px",
              }}
            />
          </ExpandMoreButton>
        </CardActions>
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            color={theme.palette.primary.azul}
            sx={{
              fontFamily: "Lato",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "25px",
              marginBottom: "4px",
            }}
          >
            Descripción del Microemprendimiento
          </Typography>
          <Typography
            color={theme.palette.primary.negro}
            sx={{
              fontFamily: "Lato",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "4px",
            }}
          >
            {details}
          </Typography>
        </CardContent>
      </Collapse>

      {expanded && (
        <Divider
          variant="middle"
          sx={{ backgroundColor: theme.palette.primary.negro }}
        />
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            color={theme.palette.primary.azul}
            sx={{
              fontFamily: "Lato",
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "25px",
              marginBottom: "4px",
            }}
          >
            Más información de interés
          </Typography>
          <Typography
            color={theme.palette.primary.negro}
            sx={{
              fontFamily: "Lato",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "20px",
              marginBottom: "4px",
            }}
          >
            {moreInf}
          </Typography>
        </CardContent>
      </Collapse>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            onClick={handleContactClick}           
             sx={{
              fontFamily: "Lato",
              backgroundColor: theme.palette.primary.azul,
              color: theme.palette.primary.blanco,
              fontWeight: "700",
              fontSize: "16px",
              lineHeight: "20px",
              textTransform: "none",
              border: "1px solid",
              borderRadius: "100px",
              padding: "10px 24px 10px 24px",
            }}
          >
            Contactar
          </Button>
        </Box>
        <CardActions
          disableSpacing
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ExpandMoreButton
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show less"
            sx={{
              backgroundColor: theme.palette.primary.grisClaro,
              color: theme.palette.primary.azul,
            }}
          >
            <ExpandMoreIcon
              sx={{
                fontSize: "50px",
              }}
            />
          </ExpandMoreButton>
        </CardActions>
      </Collapse>
    </Card>
  );
};

export default CustomCard;