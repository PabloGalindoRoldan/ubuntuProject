import  { useState } from "react";
import { Box, Typography, IconButton, Grow, useTheme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OptionBox from "./optionBox/OptionBox";


const MicrobusinessCard = ({ id, title, category, onEditClick, setIdTohide }) => {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();

  const handleFocus = () => {
    setFocused((prevFocused) => !prevFocused);
  };

  const handleEdit = () => {
    onEditClick(id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        minWidth: "328px",
        maxWidth: "500px",
        height: "136px",
        backgroundColor: theme.palette.primary.grisClaro,
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          py: "8px",
          pl: "20px",
          pr: "16px",
          minWidth: "136px",
          width: "95%",
          position: "relative",
        }}
      >
        <Grow in={focused} timeout={200}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <OptionBox setFocused={setFocused} onEdit={handleEdit} />
          </Box>
        </Grow>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "48px",
            }}
          >
            <Grow in={focused} timeout={10}>
              <Box>
                <OptionBox 
                  setFocused={setFocused} 
                  onEdit={handleEdit} 
                  microBusinessId={id} 
                  setIdTohide={setIdTohide}
                />
              </Box>
            </Grow>

            <Typography
              variant="h5"
              sx={{
                fontFamily: "Lato",
                color: theme.palette.primary.azul,
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "24px",
                mt: "6px",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                borderBottom: `2px solid ${theme.palette.primary.verdeCards}`,
                minWidth: "200px",
                width: "70%",
              }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              height: "70px",
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Lato",
                color: theme.palette.primary.negro,
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                maxWidth: "290px",
                height: "fit-content",
              }}
            >
              {category}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "48px",
              pt: "10px",
            }}
          >
            <IconButton
              sx={{ color: theme.palette.primary.azul }}
              onClick={handleFocus}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              height: "48px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <NavigateNextIcon sx={{ color: theme.palette.primary.azul }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MicrobusinessCard;
