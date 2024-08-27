import { ServiceHttp } from "../serviceHttp";

const serviceProvince = new ServiceHttp("/provinces/byCountry");

export const getProvincias = async (countryId) => {
  try {
    const data = await serviceProvince.get({ countryId });
    if (data.error) throw data.error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};