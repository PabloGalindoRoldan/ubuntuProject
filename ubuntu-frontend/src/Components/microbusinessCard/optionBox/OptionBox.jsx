import { Typography, Box } from "@mui/material";
import theme from "../../../theme/theme.js";

const OptionBox = ({ setFocused, onEdit, microBusinessId, setIdTohide  }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "46px",
        right: "18px",
        width: "120px",
        height: "80px",
        backgroundColor: "#FDFDFE",
        zIndex: 10,
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          pl: "16px",
          fontFamily: "Lato",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "24px",
          color: theme.palette.primary.negro,
          cursor: "pointer",
        }}
        onClick={() => {
          onEdit(microBusinessId );
          setFocused(false);
        }}
      >
        Editar
      </Typography>
      <Typography
        variant="body1"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          pl: "16px",
          fontFamily: "Lato",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "24px",
          color: theme.palette.primary.negro,
          cursor: "pointer",
        }}
        onClick={() => {
          setFocused(false);
          setIdTohide(microBusinessId);
        }}
      >
        Ocultar
      </Typography>
    </Box>
  );
};

export default OptionBox;