/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import axios from 'axios';

export interface SimplifiedUser {
    id: number,
    username: string,
    email: string,
    role: string,
}

export interface SimplifiedOng {
    id: number,
    gestor_id: number,
    razao_social: string,
    nome_fantasia: string,
    cnpj: string,
    wallet  : number,
    cep_location: string,
    numero_telefone: string,
    email_contato: string
}

export const FORM_SCHEMAS = {
    user: [
        { name: 'username', value: '', label: 'Nome de Usuário', type: 'text', placeholder: 'Ex: joaosilva' },
        { name: 'email'   , value: '', label: 'E-mail', type: 'email', placeholder: 'joao@email.com' },
        { name: 'passwrd' , value: '', label: 'Senha', type: 'text', placeholder: '' },
        { name: 'role'    , value: '', label: 'Função', type: 'text', placeholder: 'Ex: admin, user...' },
    ],
    ong: [
        { name: 'gestor_id'      , value: '', label: 'ID do Gestor', type: 'number', placeholder: 'Ex: 10' },
        { name: 'razao_social'   , value: '', label: 'Razão Social', type: 'text', placeholder: 'Ex: Associação Amigos da Terra' },
        { name: 'nome_fantasia'  , value: '', label: 'Nome Fantasia', type: 'text', placeholder: 'Ex: ONG Verde Vida' },
        { name: 'cnpj'           , value: '', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00' },
        { name: 'cep_location'   , value: '', label: 'CEP', type: 'text', placeholder: 'Ex: 12345-678' },
        { name: 'numero_telefone', value: '', label: 'Telefone', type: 'text', placeholder: 'Ex: (11) 99999-9999' },
        { name: 'email_contato'  , value: '', label: 'E-mail de Contato', type: 'email', placeholder: 'contato@ong.com' },
    ]
}

class Api {
    private api;
    public errorResponse: string;
    
    constructor(){
        this.api = axios.create({
            baseURL: 'https://sicronweb-backend.onrender.com/api'
        })

        this.errorResponse = '';
    }

    public async fetchUsers(): Promise<Array<SimplifiedUser>> {
        try{
            const response = await this.api.get('/users');

            const data = response.data;

            return response.data.users.map((u: any) => ({
                id: u.id,
                username: u.username,
                email: u.email,
                role: u.role
            }));
        } catch (error) {
            console.error("Erro na camada da API:", error);
            // Lança o erro para o useEffect pegar
            throw new Error("Falha ao buscar usuários.");
        }
    }

    public async fetchCreateUser(user: Partial<SimplifiedUser>): Promise<SimplifiedUser | null> {
        try{
            const response = await this.api.post('/users', {...user});

            if (response.status != 201) {
                this.errorResponse = response.data.message;
                return null;
            }


            const fullUser = response.data.userCreated;

            const simplifiedUser: SimplifiedUser = {
                id: fullUser.id,
                username: fullUser.username,
                email: fullUser.email,
                role: fullUser.role
            };


            return simplifiedUser;

        } catch (error) {
            console.error("Erro na camada da API:", error);
            // Lança o erro para o useEffect pegar
            throw new Error("Falha ao cadastrar usuário.");
        }
    }

    public async fetchUser(id: string): Promise<SimplifiedUser | null> {
        const response = await this.api.get(`/users/${id}`);

        return response.data.user;
    }

    public async fetchUpdateUser(user: SimplifiedUser): Promise<SimplifiedUser | null>{
        this.errorResponse = '';

        const response = await this.api.put(`/users/${user.id}`, {...user});
        
        if (response.status != 200) {
            this.errorResponse = response.data.message;
            return null;
        }

        return {
            id: response.data.updateUser.id,
            username: response.data.updateUser.username,
            email: response.data.updateUser.email,
            role: response.data.updateUser.role
        }
    }

    public async fetchDeleteUser(idUser: number): Promise<String | null> {
        const response = await this.api.delete(`/users/${idUser}`);

        if (response.status != 204) {
            this.errorResponse = response.data.message;
            return null;
        }

        return 'Usuário Removido!';
    }

    public async fetchCreateOng(ong: Partial<SimplifiedOng>): Promise<SimplifiedOng | null> {
        this.errorResponse = '';
        
        const response = await this.api.post('/ongs', {...ong})

        if (response.status != 201) {
            this.errorResponse = response.data.message;
            return null;
        }

        return response.data.ongCreated;
    }
}

export const api = new Api();