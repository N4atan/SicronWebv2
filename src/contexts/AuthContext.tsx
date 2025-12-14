// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAll, User } from "../services/user.service";
import { loginRequest, logoutRequest, checkAuthRequest } from "../services/auth.service";

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn: (data: any) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Função auxiliar para carregar dados do usuário
    const loadUserProfile = async () => {
        try {
            // Busca todos e tenta achar o meu (já que o backend filtra por email automaticamente)
            const users = await getAll({});
            const myUser = users.find((u: any) => u.email);
            if (myUser) setUser(myUser);
        } catch (error) {
            console.log("Não foi possível carregar perfil do usuário.");
        }
    };

    // 1. Ao iniciar a tela (F5)
    useEffect(() => {
        const initAuth = async () => {
            const isValid = await checkAuthRequest(); // O interceptor trabalha aqui se precisar!
            if (isValid) {
                await loadUserProfile();
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    // 2. Login
    const signIn = async (data: User) => {
        await loginRequest(data); // Cria a sessão
        await loadUserProfile();  // Puxa os dados
    };

    // 3. Logout
    const signOut = async () => {
        await logoutRequest();
        setUser(null);
        // window.location.href = '/login'; // Opcional: forçar recarregamento
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);