import { api, AxiosHandleError } from "./api";

// Interface atualizada baseada no Backend (OngController / Entity)
export interface NGO {
    uuid?: string;
    id?: number; // Backend usa ID numérico em algumas rotas, UUID em outras? Confirmar. O controller usa Number(id).
    // Campos do Backend (Strict Match)
    name: string;
    trade_name: string;
    cnpj: string;
    area: string;
    description: string;
    local: string;
    phone_number: string;
    contact_email: string;

    // Metadados
    status?: 'pending' | 'approved' | 'rejected' | 'PENDING' | 'APPROVED' | 'REJECTED';
    created_at?: string;
    wallet?: number;
}

export let errorOngService: string;

// GET /ngos
export const getAllOngs = async (filters?: Partial<NGO>): Promise<NGO[]> => {
    try {
        const response = await api.get('/ngos', {
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

export const getOngByUuid = async (uuid: string): Promise<NGO | null> => {
    try {
        const response = await api.get(`/ngos/${uuid}`);
        return response.data;
    } catch {
        return null;
    }
}


// POST /ngos
export const registerOng = async (newOng: NGO): Promise<boolean> => {
    try {
        await api.post('/ngos', newOng);
        // Se não der erro (cair no catch), assumimos sucesso (201 Created)
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao criar ONG');
        return false;
    }
}

// PATCH /ngos/:uuid
export const updateOng = async (uuid: string, ngo: Partial<NGO>): Promise<boolean> => {
    try {
        await api.patch(`/ngos/${uuid}`, ngo);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao atualizar ONG');
        return false;
    }
}

// DELETE /ngos/:uuid
export const deleteOng = async (uuid: string): Promise<boolean> => {
    try {
        await api.delete(`/ngos/${uuid}`);
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao deletar ONG');
        return false;
    }
}
