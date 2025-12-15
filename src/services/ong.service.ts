import { api, AxiosHandleError } from "./api";

// Interface atualizada baseada no Backend (OngController / Entity)
export interface NGO {
    uuid?: string;
    id?: number; // Backend usa ID numérico em algumas rotas, UUID em outras? Confirmar. O controller usa Number(id).
    gestor_email: string;
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    foco_principal: string; // antigo 'area'
    objetivo: string;       // antigo 'description'
    status?: 'pending' | 'approved' | 'rejected';
    local?: string;
    numero_telefone?: string; // antigo 'phone_number'
    email_contato?: string;   // antigo 'contact_email'
    created_at?: string;

    // Campos legados para compatibilidade temporária (frontend)
    name?: string;       // Mapear para razao_social ou nome_fantasia
    trade_name?: string; // Mapear para nome_fantasia
    area?: string;       // Mapear para foco_principal
    description?: string;// Mapear para objetivo
    phone_number?: string;
    contact_email?: string;
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
