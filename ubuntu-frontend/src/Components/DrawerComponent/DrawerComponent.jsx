import { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemText, Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import UseAuth from '../../token/jwt/UseAuth';

const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = UseAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // Verifica si es vista de escritorio

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
    setAnchorEl(event.currentTarget);
  };

  const alwaysVisibleItems = ["Inicio", "Microemprendimientos", "Publicaciones", "Acceder"];

  const conditionalItems = ["Dashboard Administrador", "Microemprendimientos", "Publicaciones", "ChatBot", "Solicitudes de Contacto"];

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {alwaysVisibleItems.map((text) => (
          <ListItemButton component={Link} to={text === "Inicio" ? "/" : `/${text.toLowerCase()}`} key={text}>
            <ListItemText
              primary={text}
              sx={{ fontSize: "18px", fontWeight: "700", lineHeight: "20px", fontFamily: "Lato" }}
            />
          </ListItemButton>
        ))}
      </List>
      {user && (
        <Box>
          <Typography
            variant="h5"
            color={theme.palette.primary.main}
            fontFamily={"Lato"}
            sx={{
              mt: "30px",
              ml: "16px",
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "20px",
            }}
          >
            Administrador
          </Typography>
          <List>
            {conditionalItems.map((text) => (
              <ListItemButton component={Link} to={`/admin/${text.toLowerCase().split(" ")[0]}`} key={text}>
                <ListItemText
                  primary={text}
                  sx={{ fontSize: "18px", fontWeight: "700", lineHeight: "20px", fontFamily: "Lato" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            background: theme.palette.primary.azul,
            color: theme.palette.primary.main,
            top: "7vh",
            height: `calc(100% - ${anchorEl ? anchorEl.getBoundingClientRect().bottom : 0}px)`,
            width: "16rem",
            left: isDesktop ? "18rem" : "0", // Aplica left solo en desktop
          },
        }}
      >
        {list()}
      </Drawer>
    </Box>
  );
};

export default DrawerComponent;
