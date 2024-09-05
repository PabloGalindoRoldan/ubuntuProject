import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ServiceHttp } from "../../../../../utils/services/serviceHttp.js";

const CardMicrobusinessMonthly = () => {
  const [microBusiness, setMicroBusiness] = useState([]);
  const [monthlyMicroBussiness, setMonthlyMicroBussiness] = useState(0);
  const theme = useTheme();

  const microemprendimientos = new ServiceHttp("/microbusiness/findAll");

  const getMicroEmprendimientos = async () => {
    try {
      const recievedData = await microemprendimientos.get("search=");
      const data = recievedData.filter(item => !item.managed);
      if (data.error) throw data.error;
      setMicroBusiness(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthlyMicrobusiness = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthlyBusinesses = microBusiness.filter((micro) => {
      const microDate = new Date(micro.createdDate);
      const microMonth = microDate.getMonth() + 1;
      const microYear = microDate.getFullYear();

      return microMonth === currentMonth && microYear === currentYear;
    });
    setMonthlyMicroBussiness(monthlyBusinesses.length);
  };

  useEffect(() => {
    getMicroEmprendimientos();
  }, []);

  useEffect(() => {
    if (microBusiness.length > 0) {
      getMonthlyMicrobusiness();
    }
  }, [microBusiness]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "90%",
        maxWidth: "380px",
        borderRadius: "8px",
        py: "8px",
        backgroundColor: theme.palette.primary.azul,
        color: theme.palette.primary.main,
        mb: "16px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Lato",
          maxWidth: "250px",
          width: "90%",
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "25px",
        }}
      >
        Nuevos Microemprendimientos
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Lato",
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "25px",
        }}
      >
        {monthlyMicroBussiness}
      </Typography>
    </Box>
  );
};

export default CardMicrobusinessMonthly;
