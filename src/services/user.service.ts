import { api, AxiosHandleError } from "./api";

import { User, UserRole } from "../interfaces";

export { UserRole }; // Re-export for compatibility if needed elsewhere

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
