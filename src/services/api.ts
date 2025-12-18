import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
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

                await api.post('/users/auth/refresh');

                return api(originalRequest);
            } catch (refreshError) {

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

