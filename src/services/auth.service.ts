// services/auth.service.ts
import { api, AxiosHandleError } from "./api";
import { User } from "./user.service";

// Faz o login (backend define os cookies)
export const loginRequest = async (data: User): Promise<void> => {
    try {
        await api.post('/users/auth/login', data);
    } catch (error) {
        throw new Error(AxiosHandleError(error, 'Erro ao realizar login'));
    }
};

// Faz o logout (limpa cookies)
export const logoutRequest = async (): Promise<void> => {
    try {
        await api.post('/users/auth/logout');
    } catch (error) {
        console.error("Erro ao deslogar", error);
    }
};

// Verifica se a sessão é válida
export const checkAuthRequest = async (): Promise<boolean> => {
    try {
        // Se der 401, o interceptor tenta renovar. 
        // Se renovar, aqui retorna 200 (true). 
        // Se falhar mesmo, cai no catch (false).
        await api.post('/users/auth/check');
        return true;
    } catch (error) {
        return false;
    }
};