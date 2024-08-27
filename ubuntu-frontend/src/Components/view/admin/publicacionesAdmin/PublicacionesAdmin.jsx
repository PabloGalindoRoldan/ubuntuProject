import { Box, Typography, Grid } from "@mui/material";
import { ButtonLoad } from "../../../shared";
import PublicacionesAdminCard from "./PublicacionesAdminCard";
import { useState, useEffect } from "react";
import EditarPublicacion from "./EditarPublicacion";
import { ServiceHttp } from "../../../../utils/services/serviceHttp";
import axios from "axios";
import ModalAlert from "../../../shared/modalAlert/ModalAlert";

const PublicacionesAdmin = () => {
    const [data, setData] = useState([]);
    const [focusedCardId, setFocusedCardId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("success");
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubTitle, setModalSubTitle] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        setEditingId(id); 
    };

    const handleDelete = async (id) => {
        setDeleteId(id); 
        
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/publications/delete/${id}`);
            setData(prevData => prevData.filter(publicacion => publicacion.id !== id));
            setModalStatus("success");
            setModalTitle("Publicación ocultada con éxito.");
            setModalSubTitle("");
        } catch (error) {
            console.error("Error deleting publication:", error);
            setModalStatus("error");
            setModalTitle("Lo sentimos, la publicación no pudo ser ocultada.");
            setModalSubTitle("Por favor, volvé a intentarlo.");
        } finally {
            setDeleteId(null);
            setModalOpen(true);
        }
    };

    const fetchData = async () => {
        try {
            const publicacionesData = await new ServiceHttp("/publications/getAllPublications").get();
            publicacionesData.sort((a, b) => b.id - a.id);
            setData(publicacionesData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleEditSuccess = () => {
        setEditingId(null);
        fetchData();
    };

    const handleCancel = () => {
        setEditingId(null);
        fetchData();
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "3vh",
            paddingTop: "3vh",
            paddingLeft: "3vw",
            paddingRight: "3vw",
        }}>
            {editingId === null ? (
                <>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'Lato',
                                fontSize: '28px',
                                fontWeight: '500',
                                lineHeight: '35px',
                            }}
                        >
                            Publicaciones
                        </Typography>
                    </Box>
                    <ButtonLoad btnText="Crear Publicación" btnLink="/admin/crearpublicacion" />
                    <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap: '2vh'}}>
                        <Typography
                            sx={{
                                fontFamily: 'Lato',
                                fontSize: '22px',
                                fontWeight: '600',
                                lineHeight: '25px',
                            }}
                        >
                            Publicaciones cargadas
                        </Typography>
                        <Grid container spacing={2} sx={{ position: "relative", zIndex: 2 }}>
                            {data.map((publicacion, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <PublicacionesAdminCard
                                        cardId={publicacion.id}
                                        title={publicacion.title}
                                        images={publicacion.images.map((item) => item.url)}
                                        date={publicacion.createdDate}
                                        text={publicacion.description}
                                        focusedCardId={focusedCardId}
                                        setFocusedCardId={setFocusedCardId}
                                        onEdit={handleEdit} 
                                        onDelete={handleDelete} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </>
            ) : (
                <EditarPublicacion 
                    publicacion={data.find(pub => pub.id === editingId)} 
                    onSuccess={handleEditSuccess} 
                    onCancel={handleCancel}
                /> 
            )}

            <ModalAlert
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                open={modalOpen}
                onClose={closeModal}
                onSuccessAction={closeModal}
                onTryAgain={closeModal}
            />
        </Box>
    );
};

export default PublicacionesAdmin;