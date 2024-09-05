import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Skeleton, Stack } from "@mui/material";
import MicrobusinessCard from "../../../microbusinessCard/MicrobusinessCard";
import { ServiceHttp } from "../../../../utils/services/serviceHttp";
import { ButtonLoad } from "../../../shared";
import { ModalAlert } from "../../../shared";
import EditarMicroemprendimiento from "../../admin/microemprendimiento/EditarMicroemprendimiento";

const Microemprendimiento = () => {
  const [microBusiness, setMicroBusiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [idTohide, setIdTohide] = useState(null);

  const [modalStatus, setModalStatus] = useState("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  const [editingMicroBusinessId, setEditingMicroBusinessId] = useState(null);

  const navigate = useNavigate();
  const microemprendimientos = new ServiceHttp("/microbusiness/findAll");
  const editMicroBussiness = new ServiceHttp("/microbusiness/update");

  const getMicroEmprendimientos = async () => {
    try {
      const data = await microemprendimientos.get("search=");
      if (data.error) throw data.error;
      setMicroBusiness(Array.isArray(data) ? data : []);
    } catch (error) {
      setOpenModal(true);
      setModalStatus("error");
      setModalTitle("Error al cargar microemprendimientos");
      setModalSubTitle("Intente nuevamente mas tarde");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMicroEmprendimientos();
  }, []);

  const handleHide = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const data = await editMicroBussiness.put(id, { managed: true }, token);
      console.log(data);
      if(data.error) throw data.error
      setOpenModal(true);
      setModalStatus("success");
      setModalTitle("Microemprendimiento ocultado con éxito");
      setIdTohide(null);
      setMicroBusiness(microBusiness.filter((micro) => micro.id !== id));
    } catch (error) {
      console.log(error)
      setOpenModal(true);
      setModalStatus("error");
      setModalTitle("Error al ocultar microemprendimiento");
      setModalSubTitle("Intente nuevamente mas tarde");
      setIdTohide(null);
    }
  };

  useEffect(() => {
    if(idTohide){
      handleHide(idTohide);
    }
  },[idTohide])


  const handleTryAgain = () => {
    setLoading(true);
    setOpenModal(false);
    getMicroEmprendimientos();
  };

  const handleEditSuccess = () => {
    setEditingMicroBusinessId(null);
    getMicroEmprendimientos(); 
  };

  const handleEditClick = (id) => {
    setEditingMicroBusinessId(id);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!loading && microBusiness.length > 0 && !editingMicroBusinessId && (
        <>
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
            Microemprendimientos
          </Typography>

          <ButtonLoad btnText="Cargar Microemprendimiento" btnLink="/admin/microemprendimientos/cargar" />
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          pb: "41px",
        }}
      >
        {loading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <Stack
                key={index}
                spacing={2}
                alignItems="center"
                sx={{
                  width: "90vw",
                  minWidth: "255px",
                  maxWidth: "500px",
                  height: "136px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                  p: 2,
                }}
              >
                <Stack spacing={1} sx={{ width: "100%" }}>
                  <Skeleton variant="text" width="70%" height={28} />
                  <Skeleton variant="rectangular" width="70%" height={2} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                </Stack>
              </Stack>
            ))}
          </>
        ) : microBusiness.length === 0 ? (
          <Typography variant="body1">No hay microemprendimientos disponibles</Typography>
        ) : editingMicroBusinessId ? (
          <EditarMicroemprendimiento
            microBusinessId={editingMicroBusinessId}
            onEditSuccess={handleEditSuccess}
          />
        ) : (
          microBusiness
            .sort((a, b) => b.id - a.id) 
            .map((micro) => micro.managed ? null :  (
              <MicrobusinessCard
                key={micro.id}
                id={micro.id}
                title={micro.name}
                category={micro.categoryDescription}
                onEditClick={handleEditClick} 
                setIdTohide={setIdTohide}
              />
            ))
        )}
      </Box>

      <ModalAlert
        open={openModal}
        onClose={() => setOpenModal(false)}
        status={modalStatus}
        onSuccessAction={() => {
          setOpenModal(false);
          if(idTohide){
            navigate("/admin/dashboard");
          }
        }}
        onTryAgain={handleTryAgain}
        title={modalTitle}
        subTitle={modalSubTitle}
      />
    </Box>
  );
};

export default Microemprendimiento;