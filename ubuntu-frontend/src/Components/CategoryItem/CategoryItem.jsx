import { Box, styled, useTheme, Typography } from "@mui/material";

const CategoryItem = ({ picUrl, contentText, bgColor, onClick }) => {
  const theme = useTheme();

  const Img = styled("img")({
    width: 28,
    height: 28,
    objectFit: "contain",
    objectPosition: "center",
  });

  return (
    <Box
      sx={{
        width: "94vw",
        maxWidth: 450,
        height: 64,
        backgroundColor: bgColor || theme.palette.primary.grisClaro,
        borderRadius: "16px",
        display: "flex",
        justifyContent: "between",
        alignItems: "center",
        cursor: "pointer",
        mx: "4vw",
        overflow: "hidden",
        "&:hover": {
          backgroundColor: theme.palette.primary.grisClaro,
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid ${theme.palette.primary.verdeCards}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "22.5px",
          marginRight: "8px",
          
        }}
      >
        <Img src={`src/assets/img/${picUrl}`} alt={`icon ${contentText}`} />
      </Box>
      <Box
        className={"hovertiza"}
        sx={{
          width: 235,
          height: 48,
          borderBottom: `1px solid ${theme.palette.primary.verdeCards}`,
        }}
      >
        <Typography
          variant="body1"
          align="left"
          color={theme.palette.primary.azul}
          sx={{ 
            fontFamily: "Lato", 
            fontSize: "16px", 
            lineHeight: "25px",
            fontWeight: "400",
          }}
        >
          {contentText}
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryItem;
