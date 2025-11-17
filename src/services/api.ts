/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import axios, { AxiosError } from 'axios';

export enum StatusOng {
    PENDENTE,
    APROVADA,
    REJEITADA
}


export interface SimplifiedUser {
    id: number,
    username: string,
    email: string,
    role: string,
    password?: string
}

export interface SimplifiedOng {
    id: number,
    gestor_email: string,
    razao_social: string,
    nome_fantasia: string,
    objetivo: string,
    cnpj: string,
    wallet: number,
    cep_location: string,
    numero_telefone: string,
    email_contato: string,
    criado_em?: string,
    status?: StatusOng;
}

// Mantive seus schemas como estavam
export const FORM_SCHEMAS = {
    user: [
        { name: 'username', value: '', label: 'Nome de Usuário', type: 'text', placeholder: 'Ex: joaosilva' },
        { name: 'email', value: '', label: 'E-mail', type: 'email', placeholder: 'joao@email.com' },
        { name: 'passwrd', value: '', label: 'Senha', type: 'text', placeholder: '' },
        { name: 'role', value: 'user', label: 'Função', type: 'text', placeholder: 'Ex: admin, user...' },
    ],
    ong: [
        { name: 'gestor_email', value: '', label: 'Email do Gestor', type: 'text', placeholder: '* Ele deve estar cadastrado na plataforma! *' },
        { name: 'razao_social', value: '', label: 'Razão Social', type: 'text', placeholder: 'Ex: Associação Amigos da Terra' },
        { name: 'nome_fantasia', value: '', label: 'Nome Fantasia', type: 'text', placeholder: 'Ex: ONG Verde Vida' },
        { name: 'cnpj', value: '', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00' },
        { name: 'cep_location', value: '', label: 'Cidade - Estado', type: 'text', placeholder: 'Ex: São Leopoldo, RS' },
        { name: 'numero_telefone', value: '', label: 'Telefone', type: 'text', placeholder: 'Ex: (11) 99999-9999' },
        { name: 'email_contato', value: '', label: 'E-mail de Contato', type: 'email', placeholder: 'contato@ong.com' },
    ]
}

class Api {
    private api;
    public errorResponse: string;

    constructor() {
        this.api = axios.create({
            baseURL: 'https://sicronweb-backend.onrender.com/api'
        })

        this.errorResponse = '';
    }

    // Método auxiliar para tratar erros repetitivos
    private handleAxiosError(error: any, defaultMessage: string) {
        console.error(defaultMessage, error);
        
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            // Pega a mensagem exata enviada pelo backend (ex: "Razão Social já cadastrada!")
            this.errorResponse = error.response.data.message || defaultMessage;
        } else {
            this.errorResponse = defaultMessage;
        }
    }

    public async fetchUsers(): Promise<Array<SimplifiedUser>> {
        this.errorResponse = '';
        try {
            const response = await this.api.get('/users');
            return response.data.users.map((u: any) => ({
                id: u.id,
                username: u.username,
                email: u.email,
                role: u.role
            }));
        } catch (error) {
            this.handleAxiosError(error, "Falha ao buscar usuários.");
            return []; // Retorna array vazio para não quebrar o .map no front
        }
    }

    public async fetchCreateUser(user: Partial<SimplifiedUser>): Promise<SimplifiedUser | null> {
        this.errorResponse = '';
        try {
            const response = await this.api.post('/users', { ...user });
            
            // Se chegou aqui, é sucesso (201)
            const fullUser = response.data.userCreated;
            
            return {
                id: fullUser.id,
                username: fullUser.username,
                email: fullUser.email,
                role: fullUser.role
            };

        } catch (error) {
            this.handleAxiosError(error, "Falha ao cadastrar usuário.");
            return null;
        }
    }

    public async fetchUser(id: string): Promise<SimplifiedUser | null> {
        this.errorResponse = '';
        try {
            const response = await this.api.get(`/users/${id}`);
            return response.data.user;
        } catch (error) {
            this.handleAxiosError(error, "Usuário não encontrado.");
            return null;
        }
    }

    public async fetchUpdateUser(user: SimplifiedUser): Promise<SimplifiedUser | null> {
        this.errorResponse = '';
        try {
            const response = await this.api.put(`/users/${user.id}`, { ...user });
            
            return {
                id: response.data.updateUser.id,
                username: response.data.updateUser.username,
                email: response.data.updateUser.email,
                role: response.data.updateUser.role
            };
        } catch (error) {
            this.handleAxiosError(error, "Falha ao atualizar usuário.");
            return null;
        }
    }

    public async fetchDeleteUser(idUser: number): Promise<String | null> {
        this.errorResponse = '';
        try {
            await this.api.delete(`/users/${idUser}`);
            return 'Usuário Removido!';
        } catch (error) {
            this.handleAxiosError(error, "Falha ao remover usuário.");
            return null;
        }
    }

    public async fetchCreateOng(ong: Partial<SimplifiedOng>): Promise<SimplifiedOng | null> {
        this.errorResponse = '';
        try {
            const response = await this.api.post('/ongs', { ...ong });
            return response.data.ongCreated;
        } catch (error) {
            // Aqui a mágica acontece: O erro 409 cai aqui, e a função salva a mensagem "Razão Social..."
            this.handleAxiosError(error, "Falha ao criar ONG.");
            return null;
        }
    }

    public async fetchOngs(): Promise<SimplifiedOng[] | null> {
        this.errorResponse = '';
        try {
            const response = await this.api.get('/ongs');
            return response.data.ongs;
        } catch (error) {
            this.handleAxiosError(error, "Falha ao listar ONGs.");
            return null;
        }
    }

    public async fetchDeleteOng(idOng: number): Promise<String | null> {
        this.errorResponse = '';
        try {
            await this.api.delete(`/ongs/${idOng}`);
            return 'ONG Removida!';
        } catch (error) {
            this.handleAxiosError(error, "Falha ao remover ong.");
            return null;
        }
    }
}

export const api = new Api();