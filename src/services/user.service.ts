import { api, AxiosHandleError } from "./api";

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ONG_MANAGER = 'ongManager',
  PROVIDER_MANAGER = 'providerManager'
}

export interface User {
  uuid?: string;
  username: string;
  email?: string; // Oculto se não for o próprio usuário ou Admin
  password?: string;
  role?: UserRole;
  created_at?: string;
}

export let errorUserService: string;

export const getAll = async (filters?: Partial<User>): Promise<User[]> => {
    const response = await api.get('/user', {
        params: filters
    });
    return response.data.users;
}

export const registerUser = async (newUser: Partial<User>): Promise<User | null> => {
    try 
    {
        const response = await api.post('/user', newUser);
        return response.data;
    }
    catch (error: unknown) 
    {
        errorUserService = AxiosHandleError(error, 'Erro ao Cadastrar Úsuario');
        return null;
    }
}

export const loginUser = async (user: Partial<User>): Promise<boolean> => {
    try 
    {
        await api.post('/user/auth/login', user);
        
        return true;
    }
    catch (error: unknown) 
    {
        errorUserService = AxiosHandleError(error, 'Erro ao Logar');
        return false;
    }
}
