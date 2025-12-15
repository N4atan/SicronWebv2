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
        // && !originalRequest.url.includes('/user/auth/refresh')
        // Isso impede que ele tente renovar o token se a falha veio da própria renovação
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/user/auth/refresh')
        ) {
            originalRequest._retry = true;

            try {
                // Tenta renovar
                await api.post('/user/auth/refresh');
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

export const FORM_SCHEMAS = {
    ong: [
        { name: 'name', label: 'Nome da ONG', placeholder: 'Digite o nome da ONG', type: 'text', value: '' },
        { name: 'trade_name', label: 'Nome Fantasia', placeholder: 'Digite o nome fantasia', type: 'text', value: '' },
        { name: 'cnpj', label: 'CNPJ', placeholder: '00.000.000/0000-00', type: 'text', value: '' },
        { name: 'email', label: 'E-mail', placeholder: 'email@ong.org', type: 'email', value: '' },
        { name: 'area', label: 'Área de Atuação', placeholder: 'Ex: Saúde, Educação, Meio Ambiente', type: 'text', value: '' },
        { name: 'description', label: 'Descrição', placeholder: 'Descreva a ONG...', type: 'textarea', value: '' },
        { name: 'local', label: 'Localização', placeholder: 'Cidade - UF', type: 'text', value: '' },
        { name: 'phone_number', label: 'Telefone', placeholder: '(00) 00000-0000', type: 'text', value: '' },
        { name: 'contact_email', label: 'E-mail de Contato', placeholder: 'contato@ong.org', type: 'email', value: '' },
    ]
};