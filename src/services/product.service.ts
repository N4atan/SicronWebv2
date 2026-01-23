import { api } from "./api";


import { Product, NGOProduct } from "../interfaces";

export interface CreateNGOProductDTO {
    name: string;
    quantity: number;
    notes?: string;
}


export const getAllProducts = async (nameFilter?: string): Promise<Product[]> => {
    try {
        const params = nameFilter ? { name: nameFilter } : {};
        const response = await api.get('/products', { params });
        // Backend retorna { products: [...] }
        return response.data.products || [];
    } catch (error) {
        console.error("Erro ao buscar produtos globais:", error);
        return [];
    }
};


export const addProductToNGO = async (ngoUuid: string, data: CreateNGOProductDTO): Promise<NGOProduct | null> => {
    try {

        const response = await api.post(`/ngo-products/${ngoUuid}/products`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar produto à ONG:", error);
        return null;
    }
};


export const createProduct = async (data: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await api.post('/products', data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return null;
    }
};


export const removeProductFromNGO = async (ngoProductUuid: string): Promise<boolean> => {
    try {
        await api.delete(`/ngo-products/product/${ngoProductUuid}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover produto da ONG:", error);
        return false;
    }
};


export const deleteProduct = async (productUuid: string): Promise<boolean> => {
    try {
        await api.delete(`/products/${productUuid}`);
        return true;
    } catch (error) {
        console.error("Erro ao deletar produto global:", error);
        return false;
    }
};

export const updateProduct = async (productUuid: string, data: Partial<Product>): Promise<boolean> => {
    try {
        await api.patch(`/products/${productUuid}`, data);
        return true;
    } catch (error) {
        console.error("Erro ao atualizar produto global:", error);
        return false;
    }
};


export const updateNGOProduct = async (ngoProductUuid: string, data: Partial<CreateNGOProductDTO>): Promise<boolean> => {
    try {
        await api.patch(`/ngo-products/product/${ngoProductUuid}`, data);
        return true;
    } catch (error) {
        console.error("Erro ao atualizar produto da ONG:", error);
        return false;
    }
};

export const addSupplierProduct = async (supplierUuid: string, data: any): Promise<any | null> => {
    try {
        const response = await api.post(`/supplier-products/${supplierUuid}/products`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar produto do fornecedor:", error);
        return null;
    }
};

export const updateSupplierProduct = async (supplierProductUuid: string | number, data: any): Promise<boolean> => {
    try {
        await api.patch(`/supplier-products/product/${supplierProductUuid}`, data);
        return true;
    } catch (error) {
        console.error("Erro ao atualizar produto do fornecedor:", error);
        return false;
    }
};
