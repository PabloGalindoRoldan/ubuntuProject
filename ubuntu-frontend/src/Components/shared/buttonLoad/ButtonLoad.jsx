import { Button, useTheme, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonLoad = ({
  btnText,
  
  btnLink = "/",
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(btnLink);
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: theme.palette.primary.azul,
        width: "95%",
        maxWidth: "350px",
        minWidth: "255px",
        height: "40px",
        borderRadius: "100px",
        mb: "48px",
        zIndex: 1,
        "&:hover": {
          backgroundColor: theme.palette.primary.azul,
        },
      }}
      onClick={handleClick}
    >
      <Typography
        variant="p"
        sx={{
          textTransform: "none",
          color: theme.palette.primary.main,
          fontFamily: "Lato",
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        {btnText}
      </Typography>
    </Button>
  );
};

export default ButtonLoad;