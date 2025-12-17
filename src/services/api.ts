import axios from 'axios';

export const api = axios.create({
    baseURL: '/api', // Usa o proxy do Vite para evitar problemas de CORS/Cookies
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // VERIFICAÇÃO CRUCIAL ADICIONADA: 
        // && !originalRequest.url.includes('/users/auth/refresh')
        // Isso impede que ele tente renovar o token se a falha veio da própria renovação
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/users/auth/refresh')
        ) {
            originalRequest._retry = true;

            try {
                // Tenta renovar
                await api.post('/users/auth/refresh');
                // Se funcionar, refaz a requisição original
                return api(originalRequest);
            } catch (refreshError) {
                // Se falhar, não faz nada (o usuário será deslogado pelo fluxo normal)
                // O catch do auth_check no service vai pegar esse erro.
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const AxiosHandleError = (error: unknown, defaultMessage: string): string => {
    console.error(defaultMessage, error);
    if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data.message || defaultMessage;
    }
    return defaultMessage;
};

