import { Box, Typography, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { ServiceHttp } from "../../../../../utils/services/serviceHttp";


const CardEstadisticas = () => {

    const [dataGestionados, setDataGestionados] = useState([]);
    const [dataNoGestionados, setDataNoGestionados] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseNoManage = await new ServiceHttp("/contact/search/nomanage").get();
            const responseManage = await new ServiceHttp("/contact/search/manage").get();
            const dataNoGest = responseNoManage.length
            const dataGest = responseManage.length
            setDataGestionados(dataGest);
            setDataNoGestionados(dataNoGest);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Box sx={{display: 'flex', justifyContent: "space-between", width: 'auto', gap: '20px'}}>
            <Box sx={{width: '43vw', border: '2px solid #1D9129', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <Typography sx={{fontFamily: 'Lato', fontWeight: '400', fontSize: '18px', lineHeight: '25px'}}>
                    Gestionados
                </Typography>
                <Divider sx={{width: '30%', borderColor: '#1D9129'}}/>
                <Typography sx={{fontFamily: 'Lato', fontWeight: '700', fontSize: '20px', lineHeight: '25px'}}>
                    {dataGestionados}
                </Typography>
            </Box>
            <Box sx={{width: '43vw', border: '2px solid #B86B11', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <Typography sx={{fontFamily: 'Lato', fontWeight: '400', fontSize: '18px', lineHeight: '25px'}}>
                    No Gestionados
                </Typography>
                <Divider sx={{width: '30%', borderColor: '#B86B11'}}/>
                <Typography sx={{fontFamily: 'Lato', fontWeight: '700', fontSize: '20px', lineHeight: '25px'}}>
                    {dataNoGestionados}
                </Typography>
            </Box>
        </Box>
    );
};

export default CardEstadisticas;
