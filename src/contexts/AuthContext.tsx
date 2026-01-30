// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../interfaces";
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
            const userProfile = await checkAuthRequest();
            if (userProfile) {
                setUser(userProfile);
                if (userProfile.email) localStorage.setItem('@App:user_email', userProfile.email);
                return true;
            }
        } catch (error) {
            alert(error);
            console.error(error)
        }
        return false;
    };

    // 1. Ao iniciar a tela (F5)
    useEffect(() => {
        const initAuth = async () => {
            try {
                // Tenta carregar o perfil diretamente da verificação de sessão
                const userProfile = await checkAuthRequest();

                if (userProfile) {
                    setUser(userProfile);
                    if (userProfile.email) localStorage.setItem('@App:user_email', userProfile.email);
                } else {
                    setUser(null);
                    localStorage.removeItem('@App:user_email');
                }
            } catch (err) {
                console.error("Erro na verificação de autenticação.");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    // 2. Login
    const signIn = async (data: User) => {
        await loginRequest(data); // Cria a sessão

        // Puxa os dados e verifica sucesso. 
        // Agora checkAuthRequest já retorna o usuário correto se o cookie estiver setado.
        const success = await loadUserProfile();

        if (!success) {
            console.error("Login realizado mas falha ao obter dados do usuário/sessão.");
            throw new Error("Erro ao carregar dados do usuário. Tente novamente.");
        }
    };

    // 3. Logout
    const signOut = async () => {
        await logoutRequest();
        console.log("Logout realizado com sucesso.");
        setUser(null);
        localStorage.removeItem('@App:user_email');
        window.location.href = '/entrar';
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);