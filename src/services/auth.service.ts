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

// Verifica se a sessão é válida e retorna o usuário se logado
export const checkAuthRequest = async (): Promise<User | null> => {
    try {
        const response = await api.post('/users/auth/check');
        return response.data;
    } catch (error) {
        return null;
    }
};