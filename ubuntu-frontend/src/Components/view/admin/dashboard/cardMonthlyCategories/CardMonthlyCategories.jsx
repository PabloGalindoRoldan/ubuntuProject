import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ServiceHttp } from "../../../../../utils/services/serviceHttp.js";

const CardMonthlyCategories = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [microBusiness, setMicroBusiness] = useState([]);
  const [monthlyMicroBussiness, setMonthlyMicroBussiness] = useState({});
  const [categoriaCantidad, setCategoriaCantidad] = useState({});

  const categorias = new ServiceHttp("/microbusiness/categories");
  const microemprendimientos = new ServiceHttp("/microbusiness/findAll");

  const getCateogiras = async () => {
    try {
      const data = await categorias.get("search=");
      if (data.error) throw data.error;
      setCategories(Array.isArray(data) ? data : []);
      setCategoriaCantidad(
        data.map((category) => {
          return {
            ...category,
            cantidad: 0,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

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
    setMonthlyMicroBussiness(monthlyBusinesses);
  };

  const updateCategoryCount = () => {
    const updatedCategories = categoriaCantidad.map((category) => {
      const count = monthlyMicroBussiness.reduce((acc, micro) => {
        if (micro.categoryDescription === category.description) {
          return acc + 1;
        }
        return acc;
      }, 0);

      return {
        ...category,
        cantidad: count,
      };
    });

    setCategoriaCantidad(updatedCategories);
  };

  useEffect(() => {
    getCateogiras();
  }, []);

  useEffect(() => {
    getMicroEmprendimientos();
  }, []);

  useEffect(() => {
    if (microBusiness.length > 0) {
      getMonthlyMicrobusiness();
    }
  }, [microBusiness]);

  useEffect(() => {
    if (monthlyMicroBussiness.length > 0) {
      updateCategoryCount();
    }
  }, [monthlyMicroBussiness]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "32px",
        height: "352px",
        width: "93%",
        maxWidth: "480px",
        borderRadius: "8px",
        backgroundColor: theme.palette.primary.grisClaro,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          height: "48px",
          fontFamily: "Lato",
          fontWeight: "600",
          fontSize: "20px",
          lineHeight: "25px",
          color: theme.palette.primary.azul,
          mt: "16px",
          mb: "8px",
          px: "12px",
        }}
      >
        Microemprendimientos por categoría
      </Typography>
      <Box sx={{ width: "100%", border: "1px solid #226516", mb: "16px" }} />

      {categories.map((category, index) => (
        <Box
          key={index}
          sx={{
            height: "240px",
            width: "85%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              borderBottom: "1px solid #226516",
              width: "100%",
              height: "56px",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mr: "8px",
                fontFamily: "Lato",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "25px",
              }}
            >
              {category.description.replace(/\//g, " / ")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                width: "50px",
                fontFamily: "Lato",
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "25px",
              }}
            >
              {categoriaCantidad.find((c) => c.description === category.description).cantidad}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CardMonthlyCategories;
