import { useState, useContext } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../theme/theme.js";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../shared/searchContext/SearchContext.jsx";
import { ServiceHttp } from "../../utils/services/serviceHttp.js";

const SearchBar = ({ customStyles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchResults } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const service = new ServiceHttp('/microbusiness/');
      const parametrosDeBusqueda = { search: `${searchTerm}` };
      const resultado = await service.get(parametrosDeBusqueda);
      if (Array.isArray(resultado)) {
        setSearchResults(resultado);
      } else {
        console.error('API response is not an array:', resultado);
        setSearchResults([]);
      }

      setSearchResults(resultado);
      navigate('/buscar');
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setSearchResults([]);
      navigate('/buscar');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20px",
        padding: "1px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: { xs: "90vw", sm: "80vw", md: "60vw", lg: "50vw" }, 
        border: "0",
        zIndex: "10",
        ...customStyles,
      }}
    >
      <TextField
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar Microemprendimiento"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
        }}
        fullWidth
      />
    </Box>
  );
};

export default SearchBar;
