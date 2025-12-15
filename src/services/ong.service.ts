import { api, AxiosHandleError } from "./api";

// Interface baseada no manual
export interface NGO {
    uuid: string;
    manager_uuid?: string; // UUID do usuário dono
    name: string;
    trade_name: string;
    cnpj: string;
    area: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    local?: string;
    phone_number?: string;
    contact_email?: string;
    created_at?: string;
}

export let errorOngService: string;

// GET /ngo
export const getAllOngs = async (filters?: Partial<NGO>): Promise<NGO[]> => {
    try {
        const response = await api.get('/ngo', {
            params: filters
        });

        // Proteção Robusta: Tenta extrair o array de várias formas possíveis
        const data = response.data;

        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.ngos)) return data.ngos;
        if (data && Array.isArray(data.data)) return data.data; // Paginação comum (Laravel/Nest)
        if (data && Array.isArray(data.users)) return data.users; // Copypaste error do backend? nunca se sabe

        console.warn("API retornou formato desconhecido para ONGs:", data);
        return [];
    } catch (error) {
        return [];
    }
}


// POST /ngo
export const registerOng = async (newOng: Partial<NGO>): Promise<NGO | null> => {
    try {
        const response = await api.post('/ngo', newOng);
        return response.data;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao criar ONG');
        return null;
    }
}

// PATCH /ngo/:uuid
export const updateOng = async (uuid: string, data: Partial<NGO>): Promise<boolean> => {
    try {
        await api.patch(`/ngo/${uuid}`, data);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao atualizar ONG');
        return false;
    }
}

// DELETE /ngo/:uuid
export const deleteOng = async (uuid: string): Promise<boolean> => {
    try {
        await api.delete(`/ngo/${uuid}`);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao deletar ONG');
        return false;
    }
}
