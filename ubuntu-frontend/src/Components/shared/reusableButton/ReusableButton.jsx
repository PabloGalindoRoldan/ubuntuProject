import { Button, useTheme, Typography } from "@mui/material";

const ReusableButton = ({ nombre, handleClick, type = "button" }) => {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            type={type}
            sx={{
                backgroundColor: "#6E6F70",
                width: "95%",
                maxWidth: "350px",
                minWidth: "255px",
                height: "40px",
                borderRadius: "100px",
                mt: "40px",
                mb: "48px",
                zIndex: 1,
                "&:hover": {
                    backgroundColor: "#6E6F70",
                },
            }}
        >
            <Typography
                variant="p"
                sx={{
                    textTransform: "none",
                    color: theme.palette.primary.blanco,
                    fontFamily: "Lato",
                    fontWeight: "700",
                    fontSize: "16px",
                }}
            >
                {nombre}
            </Typography>
        </Button>
    );
};

export default ReusableButton;