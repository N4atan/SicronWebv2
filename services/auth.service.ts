import { api, AxiosHandleError } from "./api"

export let errorAuthService: string;


export const auth_check = async (): Promise<boolean> => {
    try {
        await api.post('/user/auth/check');

        return true;
    } 
    catch (error: unknown) 
    {
        errorAuthService = AxiosHandleError(error, 'Erro ao Checar Login');
        return false;
    }
    
}