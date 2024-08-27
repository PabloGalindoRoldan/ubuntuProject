import { Button, Typography } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
const ChatBotBtn = () => {
  return (
    <Button
      variant="outlined"
      size="large"
      startIcon={
        <SmartToyOutlinedIcon
          sx={{
            width: "35px",
            height: "35px",
          }}
        />
      }
      sx={{
        fontFamily: "Lato",
        height: "64px",
        width: "90%",
        maxWidth: "380px",
        color: "#18191A",
        border: "2px solid #18191A",
        my: "40px",
        "&:hover": {
          border: "2px solid #18191A",
          backgroundColor: "#f5f4f4",
        },
      }}
    >
      <Typography
        variant="p"
        color="initial"
        sx={{
          fontFamily: "Lato",
          fontWeight: "600",
          fontSize: "16px",
          width: "100%",
        }}
      >
        Configuracion UbuntuBOT
      </Typography>
    </Button>
  );
};

export default ChatBotBtn;
