import "./Navbar.css";
import { Box, Grid } from "@mui/material";
import DrawerComponent from "../drawerComponent/DrawerComponent";
import { useNavigate } from "react-router-dom";
import ShowMyGoogleUserName from "../showUser/ShowUser";
import UseAuth from "../../token/jwt/UseAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user } = UseAuth(); 

  return (
    <Box
      sx={{ height: "7vh", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}
      className="navBar__container"
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3}>
          <DrawerComponent />
        </Grid>
        <Grid item xs={6} container justifyContent="center">
          <img
            src="../../src/assets/img/logoubuntu.png"
            alt="Ubuntu Logo"
            className="navBar__logo"
            style={{ cursor: "pointer", marginTop: "3px" }}
            onClick={() => navigate("/")}
          />
        </Grid>
        {user && (
          <Grid item xs={3}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%">
              <ShowMyGoogleUserName />
            </Box>
          </Grid>
        )}
        {!user && <Grid item xs={3}></Grid>} 
      </Grid>
    </Box>
  );
}

export default Navbar;