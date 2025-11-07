/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import axios from 'axios';

export interface SimplifiedUser {
    id: number,
    username: string,
    email: string,
    role: string,
}


class Api {
    private api;
    
    constructor(){
        this.api = axios.create({
            baseURL: 'https://sicronweb-backend.onrender.com/api'
        })
    }

    public async fetchUsers(): Promise<Array<SimplifiedUser>> {
        try{
            const response = await this.api.get('/users');
            console.info('Api: Exibindo Response:', response);

            const data = response.data;
            console.info('Api: Exibindo Data:', data);

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

    public async fetchCreateUser(username: string, email: string, password: string): Promise<SimplifiedUser> {
        try{
            const response = await this.api.post('/users', {username, email, password});

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
}

export const api = new Api();