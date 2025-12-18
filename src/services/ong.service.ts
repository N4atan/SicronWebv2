import { api, AxiosHandleError } from "./api";


import { NGO } from "../interfaces";

export let errorOngService: string;


export const getAllOngs = async (filters?: Partial<NGO>): Promise<NGO[]> => {
    try {
        const response = await api.get('/ngos', {
            params: filters
        });


        const data = response.data;

        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.ngos)) return data.ngos;
        if (data && Array.isArray(data.data)) return data.data;

        console.warn("API retornou formato desconhecido para ONGs:", data);
        return [];
    } catch (error) {
        return [];
    }
}

export const getOngByUuid = async (uuid: string): Promise<NGO | null> => {
    try {
        const response = await api.get(`/ngos/${uuid}`);
        return response.data;
    } catch {
        return null;
    }
}



export const registerOng = async (newOng: NGO): Promise<boolean> => {
    try {
        await api.post('/ngos', newOng);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao criar ONG');
        return false;
    }
}


export const updateOng = async (uuid: string, ngo: Partial<NGO>): Promise<boolean> => {
    try {
        await api.patch(`/ngos/${uuid}`, ngo);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao atualizar ONG');
        return false;
    }
}


export const deleteOng = async (uuid: string): Promise<boolean> => {
    try {
        await api.delete(`/ngos/${uuid}`);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao deletar ONG');
        return false;
    }
}
