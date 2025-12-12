import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://sicronweb-backend.onrender.com/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})



api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Se o erro for 401 (Não autorizado) e não for uma tentativa de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Tenta renovar os tokens chamando o endpoint de refresh
                // O cookie refreshToken será enviado automaticamente
                await api.post('/user/auth/refresh');

                // Se der certo, refaz a requisição original
                return api(originalRequest);
            } catch (refreshError) {
                // Se o refresh falhar (ex: token expirou mesmo), desloga o usuário
                console.error('Sessão expirada. Faça login novamente.');
                // window.location.href = '/login'; 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)



export const AxiosHandleError = (error: unknown, defaultMessage: string): string => {
    console.error(defaultMessage, error);

    if ( axios.isAxiosError(error) && error.response && error.response.data ){
        return error.response.data.message || defaultMessage;
    }

    return defaultMessage;
    
}