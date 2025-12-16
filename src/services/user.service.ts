import { api, AxiosHandleError } from "./api";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',

    NGO_OWNER = 'ngoOwner',
    NGO_MANAGER = 'ngoManager',
    NGO_EMPLOYER = 'ngoEmployer',

    SUPPLIER_OWNER = 'supplierOwner',
    SUPPLIER_MANAGER = 'supplierManager',
    SUPPLIER_EMPLOYER = 'supplierEmployer'
}

export interface User {
    id?: number | string; // Legacy ID or UUID
    uuid?: string;
    username: string;
    email?: string;
    password?: string;
    role?: UserRole;
    created_at?: string;
    [key: string]: any;
}

export let errorUserService: string;

export const getAll = async (filters?: Partial<User>): Promise<User[]> => {
    try {
        const response = await api.get('/users', {
            params: filters
        });
        return response.data?.users || [];
    } catch (error) {
        return [];
    }
}

export const registerUser = async (newUser: Partial<User>): Promise<User | null> => {
    try {
        await api.post('/users', newUser);
        return { username: newUser.username || '', ...newUser } as User;
    }
    catch (error: unknown) {
        errorUserService = AxiosHandleError(error, 'Erro ao Cadastrar Úsuario');
        return null;
    }
}



export const updateUser = async (uuidOrId: number | string, data: Partial<User>): Promise<boolean> => {
    try {
        console.log(`[UserService] Updating user ID: ${uuidOrId}`);
        await api.patch(`/users/${uuidOrId}`, data);
        return true;
    } catch (error) {
        errorUserService = AxiosHandleError(error, 'Erro ao Atualizar Usuário');
        return false;
    }
}

export const deleteUser = async (uuidOrId: number | string): Promise<boolean> => {
    try {
        console.log(`[UserService] Deleting user ID: ${uuidOrId} -> URL: /users/${uuidOrId}`);
        await api.delete(`/users/${uuidOrId}`);
        return true;
    } catch (error) {
        errorUserService = AxiosHandleError(error, 'Erro ao Deletar Usuário');
        return false;
    }
}
