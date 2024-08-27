import SearchBar from "../../searchBar/SearchBar";
import { Box } from "@mui/material";

const ViewSearchBar = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "300px", sm: "400px", md: "488px" }, 
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: { xs: "10px 10px 0", md: "20px 20px 0" }, 
          position: "relative",
        }}
      >
        <SearchBar />
      </Box>
    </Box>
  );
};

export default ViewSearchBar;
