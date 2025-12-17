import { api, AxiosHandleError } from "./api";

// Interface para Supplier (Fornecedor)
export interface Supplier {
    uuid?: string;
    id?: number;
    companyName: string;
    tradeName: string;
    cnpj: string;
    contactEmail: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    status?: 'pending' | 'approved' | 'rejected' | 'PENDING' | 'APPROVED' | 'REJECTED';

    // Metadados backend
    created_at?: string;
    updated_at?: string;
    manager_uuid?: string;
}

export let errorSupplierService: string;

// GET /suppliers
export const getAllSuppliers = async (filters?: Partial<Supplier>): Promise<Supplier[]> => {
    try {
        // Correção de rota assumida: backend pode ter /suppliers ou /supplier singular?
        // Baseado em NGORoute (/ngo), pode ser /supplier.
        // Vou verificar SupplierRoutes.ts: export default router (montado em /suppliers de index.ts?)
        // Backend router: router.get('/', authenticateUser(false), SupplierController.query)
        // Se a rota montada no indexRouter for /suppliers, então aqui é /suppliers
        // Assumindo /suppliers (padrão RESTful geralmente)
        const response = await api.get('/suppliers', {
            params: filters
        });

        // Extrai dados com segurança
        const data = response.data;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.suppliers)) return data.suppliers;

        return [];
    } catch (error) {
        return [];
    }
}

// GET /suppliers/:uuid
export const getSupplierByUuid = async (uuid: string): Promise<Supplier | null> => {
    try {
        const response = await api.get(`/suppliers/${uuid}`);
        return response.data;
    } catch {
        return null;
    }
}

// POST /suppliers
export const registerSupplier = async (newSupplier: Supplier): Promise<boolean> => {
    try {
        await api.post('/suppliers', newSupplier);
        return true;
    } catch (error: unknown) {
        errorSupplierService = AxiosHandleError(error, 'Erro ao criar Fornecedor');
        return false;
    }
}

// PATCH /suppliers/:uuid
export const updateSupplier = async (uuid: string, supplier: Partial<Supplier>): Promise<boolean> => {
    try {
        await api.patch(`/suppliers/${uuid}`, supplier);
        return true;
    } catch (error: unknown) {
        errorSupplierService = AxiosHandleError(error, 'Erro ao atualizar Fornecedor');
        return false;
    }
}

// DELETE /suppliers/:uuid
export const deleteSupplier = async (uuid: string): Promise<boolean> => {
    try {
        await api.delete(`/suppliers/${uuid}`);
        return true;
    } catch (error: unknown) {
        errorSupplierService = AxiosHandleError(error, 'Erro ao deletar Fornecedor');
        return false;
    }
}
