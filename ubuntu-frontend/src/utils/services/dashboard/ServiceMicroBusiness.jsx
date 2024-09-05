import { ServiceHttp } from "../serviceHttp";

const serviceMicroBusiness = new ServiceHttp("/microbusiness/");
const serviceMicroBusinessEdit = new ServiceHttp("/microbusiness/update");


export const postMicroBusiness = async (body, token) => {
  try {
    const data = await serviceMicroBusiness.post(body, token);
    if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const putMicrobusiness = async (id, body, token) => {
  try {
    const data = await serviceMicroBusinessEdit.put(id, body, token);
    if (data.error) throw data.error;
    return data;
  } catch (error) {
    console.error("Error en putMicrobusiness:", error);
    throw error;
  }
};
