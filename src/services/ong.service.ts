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

export const getOngByUuid = async (uuid: string): Promise<NGO | null> => {
    try {
        // Assume que o backend suporta filtragem por UUID no GET /ngo?uuid=...
        // Se não suportar, teremos que buscar *todas* e filtrar no front (menos performático)
        // ou criar uma rota GET /ngo/:uuid no backend.
        // Dado o contexto, vamos tentar filtrar.
        const ongs = await getAllOngs({ uuid });
        return ongs.length > 0 ? ongs[0] : null;
    } catch {
        return null;
    }
}


// POST /ngo
// POST /ngo
export const registerOng = async (newOng: NGO): Promise<boolean> => {
    try {
        await api.post('/ngo', newOng);
        // Se não der erro (cair no catch), assumimos sucesso (201 Created)
        return true;
    } catch (error: unknown) {
        errorOngService = AxiosHandleError(error, 'Erro ao criar ONG');
        return false;
    }
}

// PATCH /ngo/:uuid
export const updateOng = async (uuid: string, ngo: Partial<NGO>): Promise<boolean> => {
    try {
        await api.patch(`/ngo/${uuid}`, ngo);
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
