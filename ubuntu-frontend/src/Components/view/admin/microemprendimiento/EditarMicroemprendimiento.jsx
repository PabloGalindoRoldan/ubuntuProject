import { Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import { useState, useEffect } from "react";
import { ReusableButton, ImageEdit, UbuntuLoader } from "../../../shared";
import { putMicrobusiness } from "../../../../utils/services/dashboard/ServiceMicroBusiness";
import { ServiceHttp } from "../../../../utils/services/serviceHttp";
import { getCategories } from "../../../../utils/services/dashboard/ServiceCategories";
import { ModalAlert } from "../../../shared";
import { getCountries } from "../../../../utils/services/dashboard/ServiceCountry";
import { getProvincias } from "../../../../utils/services/dashboard/ServiceProvince";
import { ServicePutImage, ServiceDeleteImage, ServiceUploadImage } from "../../../../utils/ServiceImage";

const EditarMicroemprendimiento = ({ microBusinessId, onEditSuccess }) => {
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [description, setDescription] = useState("");
  const [moreInformation, setMoreInformation] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const microemprendimientos = new ServiceHttp("/microbusiness");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [province, setProvince] = useState("");
  const [provincess, setProvincess] = useState([]);
  const [country, setCountry] = useState("");
  const [countriess, setCountriess] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");

  const [loading, setLoading] = useState(false);


  const getMicroEmprendimiento = async (microBusinessId) => {
    try {
      const data = await microemprendimientos.getById(microBusinessId);
      if (data.error) throw data.error;

      const matchedCategory = categories.find((cat) => cat.description === data.categoryDescription);
      const matchedCountry = countriess.find((pais) => pais.name === data.provinceCountryName);
      const matchedProvince = provincess.find((prov) => prov.name === data.provinceName);

      setName(data.name);
      setCategoria(matchedCategory ? matchedCategory.name : "");
      setCountry(matchedCountry ? matchedCountry.id : "");
      setProvince(matchedProvince ? matchedProvince.id : "");
      setDescription(data.description);
      setMoreInformation(data.moreInformation);
      setSubTitle(data.subTitle);
      setImages(data.images.map((img) => ({ id: img.id, url: `${img.url}?t=${new Date().getTime()}` })));


      if (matchedCountry) {
        await fetchProvincias(matchedCountry.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const data = await getCountries();
      setCountriess(data);
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  };

  const fetchProvincias = async (countryId) => {
    try {
      const data = await getProvincias(countryId);
      setProvincess(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchCategories();
      await fetchCountries();
      await getMicroEmprendimiento(microBusinessId);
    };

    initialize();
  }, [microBusinessId]);

  useEffect(() => {
    if (categories.length > 0 && countriess.length > 0) {
      getMicroEmprendimiento(microBusinessId);
    }
  }, [categories, countriess, provincess, microBusinessId]);

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handlePaisChange = async (event) => {
    const selectedCountryId = event.target.value;
    setCountry(selectedCountryId);
    await fetchProvincias(selectedCountryId);
    setProvince("");
  };

  const handleProvinciaChange = (event) => {
    setProvince(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleMasInformacionChange = (event) => {
    setMoreInformation(event.target.value);
  };

  const handleUploadImage = async (base64Image, fileName) => {
    const token = sessionStorage.getItem("token");
  
    try {
      await ServiceUploadImage(base64Image, microBusinessId, token);
      
      // Hacer un nuevo fetch después de subir la imagen para actualizar el estado de las imágenes
      await getMicroEmprendimiento(microBusinessId);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };


  const handleEditImage = async (id, base64Image) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await ServicePutImage(base64Image, id, token);

      if (response.url) {
        setImages((prevImages) => {
          const updatedImages = prevImages.map((img) =>
            img.id === id ? { ...img, url: `${response.url}?t=${new Date().getTime()}` } : img
          );
          return updatedImages;
        });
      } else {
        console.error("La respuesta del servidor no contiene 'url'");
      }
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
    }
  };

  const handleDeleteImage = async (id) => {
    const token = sessionStorage.getItem("token");

    try {
      await ServiceDeleteImage(id, token);
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const handleSubmit = async () => {
    const updatedMicroBusiness = {
      name,
      description,
      moreInformation,
      subTitle,
      category: categoria,
      country: parseInt(country),
      province: {
        id: parseInt(province),
      },
    };
    const token = sessionStorage.getItem("token");

    try {
      setLoading(true);
      const data = await putMicrobusiness(microBusinessId, updatedMicroBusiness, token);

      setModalTitle("Cambios guardados con éxito");
      setModalStatus("success");
      setModalOpen(true);

      setTimeout(async () => {
        await getMicroEmprendimiento(microBusinessId);
        onEditSuccess();
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar el microemprendimiento:", error);
      setLoading(false);
      setModalTitle("Lo sentimos, los cambios no pudieron ser guardados.");
      setModalSubTitle("Por favor, volvé a intentarlo.");
      setModalStatus("error");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "10px" }}>
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
          Edición de Microemprendimiento
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
        >
          Editá el formulario de carga del Microemprendimiento
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
              value={categoria}
              onChange={handleCategoriaChange}
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
              {categories.map((cat) => (
                <MenuItem key={cat.name} value={cat.name} sx={{ whiteSpace: "normal" }}>
                  {cat.description}
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
              value={country}
              onChange={handlePaisChange}
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
              {countriess.map((pais) => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.name}
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
              {provincess.map((prov) => (
                <MenuItem key={prov.id} value={prov.id}>
                  {prov.name}
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
            value={description}
            onChange={handleDescripcionChange}
            helperText={
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Máximo 300 caracteres</span>
                <span>{`${description.length}/300`}</span>
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
            onChange={handleMasInformacionChange}
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

        <ImageEdit 
        images={images} 
        onEditImage={handleEditImage} 
        onDeleteImage={handleDeleteImage} 
        onAddImage={handleUploadImage}

        />

        <ReusableButton nombre="Guardar cambios" handleClick={handleSubmit} />
      </Box>
      <ModalAlert
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        status={modalStatus}
        title={modalTitle}
        subTitle={modalSubTitle}
      />
      {loading && <UbuntuLoader />}
    </Box>
  );
};

export default EditarMicroemprendimiento;
