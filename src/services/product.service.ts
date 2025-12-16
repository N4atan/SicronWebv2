import { api } from "./api";

// Produto Global
export interface Product {
    id?: number;
    uuid: string;
    name: string;
    description: string;
    category: string;
}

// Produto vinculado a uma ONG
export interface NGOProduct {
    id: number;
    quantity: number;
    notes?: string;
    product: Product;
}

// DTO para criar vínculo
export interface CreateNGOProductDTO {
    name: string;
    quantity: number;
    notes?: string;
}

// Buscar produtos globais (para autocomplete)
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

// Adicionar produto à ONG
export const addProductToNGO = async (ngoUuid: string, data: CreateNGOProductDTO): Promise<NGOProduct | null> => {
    try {
        // Rota correta: POST /ngo-products/:uuid/products
        const response = await api.post(`/ngo-products/${ngoUuid}/products`, data);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar produto à ONG:", error);
        return null;
    }
};

// Adicionar novo produto global
export const createProduct = async (data: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await api.post('/products', data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return null;
    }
};

// Remover produto da ONG
// Nota: O endpoint espera o ID da relação (NGOProduct.id) ou UUID do registro
// Baseado na rota: DELETE /ngo-products/product/:uuid
export const removeProductFromNGO = async (ngoProductUuid: string): Promise<boolean> => {
    try {
        await api.delete(`/ngo-products/product/${ngoProductUuid}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover produto da ONG:", error);
        return false;
    }
};

// Deletar produto global
export const deleteProduct = async (productUuid: string): Promise<boolean> => {
    try {
        await api.delete(`/products/${productUuid}`);
        return true;
    } catch (error) {
        console.error("Erro ao deletar produto global:", error);
        return false;
    }
};

// Buscar produtos de uma ONG específica
// O backend deve retornar isso dentro dos dados da ONG ou em rota separada.
// Por padrão, getOngByUuid já deve trazer os produtos se tiver a relation 'products' carregada.
// Caso contrário, precisaríamos de um endpoint específico.
// Vou assumir que getOngByUuid já traga ou vamos complementar o ong.service
