import { Box, Typography } from "@mui/material";
import theme from "../../../../theme/theme";
import { useState, useEffect } from "react";
import SolicitudesCard from "../../../cards/SolicitudesCard";
import SolicitudContactoDetail from "../solicitudContactoDetail/SolicitudContactoDetail";
import { ServiceHttp } from '../../../../utils/services/serviceHttp';

function SolicitudContacto() {
    const [selectedOption, setSelectedOption] = useState("No gestionadas");
    const [selectedData, setSelectedData] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseNoManage = await new ServiceHttp("/contact/search/nomanage").get();
            responseNoManage.sort((a,b) => a.id - b.id)
            const responseManage = await new ServiceHttp("/contact/search/manage").get();
            responseManage.sort((a,b) => b.id - a.id)
            const data = responseNoManage.concat(responseManage);
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filteredData = data.filter(item => {
        if (selectedOption === "No gestionadas") {
            return item.stateRequest === false;
        } else {
            return item.stateRequest === true;
        }
    });

    const handleButtonClick = (data) => {
        setSelectedData(data);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setSelectedData(null);
    };

    const refreshData = () => {
        fetchData(); 
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "3vh",
                paddingTop: "3vh",
                paddingLeft: "3vw",
                paddingRight: "3vw",
            }}
            className="solicitudContacto__Container"
        >
            <Box className="solicitudContacto__Title">
                <Typography
                    sx={{
                        fontFamily: 'Lato',
                        fontSize: '28px',
                        fontWeight: '500',
                        lineHeight: '35px',
                    }}
                >
                    Solicitudes de contacto
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "solid 1px",
                    borderColor: theme.palette.primary.azul,
                    width: "100%",
                    padding: '8px 10px 20px 10px',
                }}
            >
                <Box
                    sx={{
                        width: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}
                    onClick={() => handleOptionChange("No gestionadas")}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Lato',
                            fontWeight: '700',
                            fontSize: '16px',
                            lineHeight: '20px',
                            color: selectedOption === "No gestionadas" ? theme.palette.primary.azul : theme.palette.primary.grisOscuro,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: '-20px',
                                height: '3px',
                                backgroundColor: theme.palette.primary.azul,
                                borderTopLeftRadius: '3px',
                                borderTopRightRadius: '3px',
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                visibility: selectedOption === "No gestionadas" ? 'visible' : 'hidden'
                            }
                        }}
                    >
                        No gestionadas
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}
                    onClick={() => handleOptionChange("Gestionadas")}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Lato',
                            fontWeight: '700',
                            fontSize: '16px',
                            lineHeight: '20px',
                            color: selectedOption === "Gestionadas" ? theme.palette.primary.azul : theme.palette.primary.grisOscuro,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: '-20px',
                                height: '3px',
                                backgroundColor: theme.palette.primary.azul,
                                borderTopLeftRadius: '3px',
                                borderTopRightRadius: '3px',
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                visibility: selectedOption === "Gestionadas" ? 'visible' : 'hidden'
                            }
                        }}
                    >
                        Gestionadas
                    </Typography>
                </Box>
            </Box>
            <Box>
                {selectedData ? (
                    <SolicitudContactoDetail {...selectedData} refreshData={refreshData} />
                ) : (
                    filteredData.map((item, index) => (
                        <SolicitudesCard
                            key={index}
                            title={item.microBusinessName}
                            microBusinessId={item.microBusinessId}
                            dateCreated={item.dateCreated}
                            dateUpdated={item.dateUpdated}
                            status={item.stateRequest}
                            name={item.fullName}
                            email={item.email}
                            phone={item.phoneNumber}
                            text={item.message}
                            onButtonClick={() => handleButtonClick(item)}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
}

export default SolicitudContacto;