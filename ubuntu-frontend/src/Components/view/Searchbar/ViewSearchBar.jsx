import SearchBar from "../../searchBar/SearchBar";
import { 
  Box,  
} from "@mui/material";

const ViewSearchBar = () => {
  

  return (
    <Box>
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "488px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px 20px 0",
          position: "relative",
        }}
      >
        <SearchBar />
        
      </Box>
        
    </Box>
  );
};

export default ViewSearchBar;
