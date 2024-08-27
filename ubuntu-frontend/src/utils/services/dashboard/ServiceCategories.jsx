import { ServiceHttp } from "../serviceHttp";

const serviceCategories = new ServiceHttp("/microbusiness/categories");

export const getCategories = async () => {
    try {
        const data = await serviceCategories.get();
        if (data.error) throw data.error;
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};