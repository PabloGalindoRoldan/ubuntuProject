import { ServiceHttp } from "../serviceHttp";

const serviceCountry = new ServiceHttp("/countries");

export const getCountries = async () => {
  try {
    const data = await serviceCountry.get();
    if (data.error) throw data.error;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};