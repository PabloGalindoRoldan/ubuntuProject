import { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, OutlinedInput } from '@mui/material';
import axios from 'axios';
import theme from '../../../../theme/theme';
import ModalAlert from '../../../shared/modalAlert/ModalAlert';
import './SolicitudContactoDetail.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
            width: 150,
        },
    },
};

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
};

function SolicitudContactoDetail({ microBusinessName, microBusinessId, stateRequest, fullName, email, phoneNumber, message, id, dateCreated, dateUpdated, refreshData }) {
    const [currentStatus, setCurrentStatus] = useState(stateRequest);
    const [loading, setLoading] = useState(false);
    const [localDateUpdated, setLocalDateUpdated] = useState(dateUpdated);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("success");
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubTitle, setModalSubTitle] = useState("");

    useEffect(() => {
        setLocalDateUpdated(dateUpdated);
    }, [dateUpdated]);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value === 'true';
        setLoading(true);
        setCurrentStatus(newStatus);

        try {
            const customId = microBusinessId;
            const url = `${import.meta.env.VITE_API_BASE_URL}/contact/update/${id}`;
            const payload = {
                stateRequest: newStatus,
                fullName,
                email,
                phoneNumber,
                message,
                microBusinessName,
                microBusiness: {id: customId},
            };
            await axios.post(url, payload);
            setLocalDateUpdated(newStatus ? new Date().toISOString() : localDateUpdated);
            setModalStatus("success");
            setModalTitle("Estado modificado con éxito");
            setModalSubTitle("");
            if (refreshData) {
                refreshData();
            }
        } catch (error) {
            console.error('Error updating state:', error);
            setModalStatus("error");
            setModalTitle("Lo sentimos, el Estado no pudo ser modificado.");
            setModalSubTitle("Por favor, volvé a intentarlo.");
        } finally {
            setLoading(false);
            setModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSuccessAction = () => {
        handleModalClose();
    };

    const handleTryAgain = () => {
        handleModalClose();
        handleStatusChange({ target: { value: currentStatus ? 'false' : 'true' } });
    };

    const className = currentStatus === false ? 'solicitudContactoDetail__orangeDot' : 'solicitudContactoDetail__greenDot';
    const statusText = currentStatus === false ? 'No gestionada' : 'Gestionada';
    const fechaText = currentStatus === false ? 'Fecha de solicitud:' : 'Fecha de gestión';
    const fechaShow = currentStatus === false ? formatDate(dateCreated) : formatDate(localDateUpdated);

    return (
        <Box sx={{ width: '94vw' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                marginBottom: '2vh'
            }}>
                <Box className={className}></Box>
                <Box>
                    <Typography sx={{
                        fontFamily: 'Lato',
                        fontWeight: '700',
                        fontSize: '18px',
                        lineHeight: '24px'
                    }}>
                        {statusText}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <FormControl sx={{ width: 150 }}>
                    <Select
                        value=""
                        onChange={handleStatusChange}
                        displayEmpty
                        input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Estado</em>
                        </MenuItem>
                        {currentStatus === false && (
                            <MenuItem value="true">Gestionada</MenuItem>
                        )}
                        {currentStatus === true && (
                            <MenuItem value="false">No gestionada</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography sx={{
                    fontFamily: 'Lato',
                    fontSize: '22px',
                    fontWeight: '700',
                    lineHeight: '24px',
                    color: theme.palette.primary.azul,
                    marginTop: '1vh',
                    marginBottom: '2vh'
                }}>
                    {microBusinessName}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography sx={{
                    fontFamily: 'Lato',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    marginBottom: '2vh',
                }}>
                    {fechaText} {fechaShow}
                </Typography>
            </Box>
            <Box sx={{
                position: 'relative',
                width: '100%',
                marginTop: '2vh',
                marginBottom: '2vh'
            }}>
                <label htmlFor="field1" className="field__label">Apellido y Nombre</label>
                <textarea
                    id="field1"
                    type="text"
                    value={fullName}
                    readOnly
                    className="field__input"
                />
            </Box>
            <Box sx={{
                position: 'relative',
                width: '100%',
                marginTop: '2vh',
                marginBottom: '2vh'
            }}>
                <label htmlFor="field2" className="field__label">Correo electrónico</label>
                <textarea
                    id="field2"
                    type="text"
                    value={email}
                    readOnly
                    className="field__input"
                />
            </Box>
            <Box sx={{
                position: 'relative',
                width: '100%',
                marginTop: '2vh',
                marginBottom: '2vh'
            }}>
                <label htmlFor="field3" className="field__label">Teléfono</label>
                <textarea
                    id="field3"
                    type="text"
                    value={phoneNumber}
                    readOnly
                    className="field__input"
                />
            </Box>
            <Box sx={{
                position: 'relative',
                width: '100%',
                marginTop: '2vh',
                marginBottom: '2vh'
            }}>
                <label htmlFor="field4" className="field__label">Mensaje</label>
                <textarea
                    id="field4"
                    value={message}
                    readOnly
                    className="field__textArea"
                />
            </Box>

            <ModalAlert
                status={modalStatus}
                title={modalTitle}
                subTitle={modalSubTitle}
                open={modalOpen}
                onClose={handleModalClose}
                onSuccessAction={handleSuccessAction}
                onTryAgain={handleTryAgain}
            />
        </Box>
    );
}

export default SolicitudContactoDetail;