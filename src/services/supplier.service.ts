import { api, AxiosHandleError } from "./api";


import { Supplier } from "../interfaces";

export let errorSupplierService: string;


export const getAllSuppliers = async (filters?: Partial<Supplier>): Promise<Supplier[]> => {
    try {

        const response = await api.get('/suppliers', {
            params: filters
        });


        const data = response.data;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.suppliers)) return data.suppliers;

        return [];
    } catch (error) {
        return [];
    }
}


export const getSupplierByUuid = async (uuid: string): Promise<Supplier | null> => {
    try {
        const response = await api.get(`/suppliers/${uuid}`);
        return response.data;
    } catch {
        return null;
    }
}


export const registerSupplier = async (newSupplier: Supplier): Promise<boolean> => {
    try {
        await api.post('/suppliers', newSupplier);
        return true;
    } catch (error: unknown) {
        errorSupplierService = AxiosHandleError(error, 'Erro ao criar Fornecedor');
        return false;
    }
}


export const updateSupplier = async (uuid: string, supplier: Partial<Supplier>): Promise<boolean> => {
    try {
        await api.patch(`/suppliers/${uuid}`, supplier);
        return true;
    } catch (error: unknown) {
        errorSupplierService = AxiosHandleError(error, 'Erro ao atualizar Fornecedor');
        return false;
    }
}


export const deleteSupplier = async (uuid: string): Promise<boolean> => {
    try {
        await api.delete(`/suppliers/${uuid}`);
        return true;
    } catch (error: unknown) {
        errorSupplierService = AxiosHandleError(error, 'Erro ao deletar Fornecedor');
        return false;
    }
}
