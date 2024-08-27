import { Button, useTheme, Typography } from "@mui/material";

const ButtonShowMore = ({btnText, btnAction = () => {console.log("clicked")} }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: theme.palette.primary.azul,
        width: "184px",
        height: "40px",
        borderRadius: "100px",
        mb: "40px",
        zIndex: 1,
        "&:hover": {
          backgroundColor: theme.palette.primary.azul,
        },
      }}
      onClick={ btnAction}
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

export default ButtonShowMore;
