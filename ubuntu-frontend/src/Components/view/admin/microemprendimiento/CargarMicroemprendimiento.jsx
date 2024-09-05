import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Button
} from "@mui/material";
import { useState, useEffect } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import { useTheme } from "@mui/material/styles";
import { ReusableButton, UbuntuLoader } from "../../../shared";
import { getCountries } from "../../../../utils/services/dashboard/ServiceCountry";
import { getProvincias } from "../../../../utils/services/dashboard/ServiceProvince";
import { getCategories } from "../../../../utils/services/dashboard/ServiceCategories";
import { postMicroBusiness } from "../../../../utils/services/dashboard/ServiceMicroBusiness";
import { ServiceUploadImage } from '../../../../utils/ServiceImage';
import { ModalAlert } from "../../../shared";
import { useNavigate } from "react-router-dom";



const CargarMicroemprendimiento = () => {
  const [name, setName] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [province, setProvince] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [moreInformation, setMoreInformation] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [country, setCountry] = useState("");
  const [countriess, setCountriess] = useState([]);
  const [category, setCategory] = useState("");
  const [categoriess, setCategoriess] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();

  const handleCategoriesChange = (event) => {
    const selectedCategories = event.target.value;
    setCategory(selectedCategories);
  };

  const handleCountryChange = (event) => {
    const selectedPais = event.target.value;
    setCountry(selectedPais);
    fetchProvincias(selectedPais);
  };

  const handleProvinciaChange = (event) => {
    const selectedProvincia = event.target.value;
    setProvince(selectedProvincia);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleMoreInformationChange = (event) => {
    setMoreInformation(event.target.value);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > 3) {
      alert("Puedes subir hasta 3 imágenes.");
      return;
    }

    for (let file of fileArray) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Cada imagen debe ser menor a 3MB.");
        return;
      }
    }

    setImageNames(fileArray.map(file => file.name));


    const base64Array = [];
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        base64Array.push({ file, base64: base64Image });
        if (base64Array.length === fileArray.length) {
          setBase64Images(base64Array);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {

    const formData = {
      name,
      description: descripcion,
      moreInformation,
      subTitle,
      category,
      country: parseInt(country),
      province: {
        id: parseInt(province)
      },
      user: {
        id: 1
      }
    };

    const token = sessionStorage.getItem('token');

    try {
      setLoading(true); 
      const response = await postMicroBusiness(formData, token);
      const microBusinessId = response.id;

      for (let image of base64Images) {
        await ServiceUploadImage(image.base64, microBusinessId, token);
      }


      setModalTitle("Microemprendimiento cargado con éxito");
      setModalStatus("success");
      setModalOpen(true);
    } catch (error) {
      console.error("Error al enviar los datos:", error);

      setLoading(false);

      setModalTitle("Lo sentimos, el Microemprendimiento no pudo ser cargado.");
      setModalSubTitle("Por favor, volvé a intentarlo.");
      setModalStatus("error");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategoriess(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const data = await getCountries();
      setCountriess(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProvincias = async (countryId) => {
    try {
      const data = await getProvincias(countryId);
      setProvincias(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchCategories();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Lato",
            fontWeight: "500",
            fontSize: "28px",
            lineHeight: "35px",
            mt: "40px",
            mb: "24px",
          }}
          align="center"
        >
          Carga de Microemprendimientos
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Lato'",
            fontWeight: "400",
            fontSize: "20px",
            lineHeight: "25px",
            textAlign: "center",
            marginTop: "2vh",
            marginLeft: "7vh",
            marginRight: "7vh",
            color: "black",
          }}
          component="div"
        >
          Completá el formulario para cargar un Microemprendimiento
        </Typography>

        <Box sx={{ mt: "20px", width: "90%" }}>
          <TextField
            fullWidth
            label="Nombre del Microemprendimiento"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="Se visualizará en el título de la publicación"
          />
        </Box>

        <Box sx={{ mt: "20px", width: "90%" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Categorías*</InputLabel>
            <Select
              value={category || ""}
              onChange={handleCategoriesChange}
              label="Categorías*"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: "auto",
                    minWidth: "100%",
                  },
                },
              }}
            >
              {categoriess.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.description}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione una categoría adecuada</FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ mt: "20px", width: "90%" }}>
          <TextField
            fullWidth
            label="Subcategoría"
            variant="outlined"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            helperText="Escribi la subcategoría del Microemprendimiento"
          />
        </Box>

        <Box sx={{ mt: "20px", width: "90%" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>País*</InputLabel>
            <Select
              value={country || ""}
              onChange={handleCountryChange}
              label="País*"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: "auto",
                    minWidth: "100%",
                  },
                },
              }}
            >
              {countriess.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione el país</FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ mt: "20px", width: "90%" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Provincia/Estado*</InputLabel>
            <Select
              value={province || ""}
              onChange={handleProvinciaChange}
              label="Provincia/Estado*"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: "auto",
                    minWidth: "100%",
                  },
                },
              }}
            >
              {provincias.map((provincia) => (
                <MenuItem key={provincia.id} value={provincia.id}>
                  {provincia.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccioná una Provincia/Estado de la lista</FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ mt: "20px", width: "90%" }}>
  <TextField
    fullWidth
    label="Descripción del Microemprendimiento*"
    variant="outlined"
    value={descripcion}
    onChange={handleDescripcionChange}
    helperText={
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Máximo 300 caracteres</span>
        <span>{`${descripcion.length}/300`}</span>
      </span>
    }
    inputProps={{ maxLength: 300 }}
    multiline
    rows={4}
  />
</Box>

<Box sx={{ mt: "20px", width: "90%" }}>
  <TextField
    fullWidth
    label="Más información del Microemprendedor*"
    variant="outlined"
    value={moreInformation}
    onChange={handleMoreInformationChange}
    helperText={
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Máximo 300 caracteres</span>
        <span>{`${moreInformation.length}/300`}</span>
      </span>
    }
    inputProps={{ maxLength: 300 }}
    multiline
    rows={4}
  />
</Box>

        <Box sx={{ mt: "20px", width: "90%", display: "flex", justifyContent: "flex-end" }}>
          <Box>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              component="label"
              sx={{
                backgroundColor: "#093C59",
                width: "95%",
                maxWidth: "152px",
                minWidth: "152px",
                height: "40px",
                borderRadius: "100px",
                mb: "15px",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.azul,
                },
                textTransform: "none",
                color: "white",
                fontFamily: "Lato",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              Subir Imágen
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </Button>

            <Typography sx={{ fontSize: '14px', maxWidth: "152px", minWidth: "152px" }}>
              *Requerida al menos una imagen<br />
              Hasta 3 imágenes. Máximo 3Mb cada una
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
              {imageNames.map((name, index) => (
                <Typography key={index} sx={{ fontSize: '14px', wordBreak: 'break-all', color: "red" }} >
                  Archivo:   {name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <ReusableButton nombre="Cargar Microemprendimiento" handleClick={handleSubmit} />
      </Box>
      <ModalAlert
        status={modalStatus}
        title={modalTitle}
        subTitle={modalSubTitle}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccessAction={() => navigate("/admin/microemprendimientos")}
        onTryAgain={() => setModalOpen(false)}
      />
      {loading && <UbuntuLoader />}

    </Box>
  );
};

export default CargarMicroemprendimiento;
