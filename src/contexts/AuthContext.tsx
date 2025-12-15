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
            const users = await getAll({});
            const storedEmail = localStorage.getItem('@App:user_email');

            let myUser = null;

            if (storedEmail) {
                // Tenta achar exatamente o e-mail que usamos no login (útil para Admins que veem todos)
                myUser = users.find((u: any) => u.email === storedEmail);
            }

            // Fallback: se não achou pelo email guardado, pega o primeiro que tiver email (Lógica segura para usuário comum)
            if (!myUser) {
                myUser = users.find((u: any) => u.email);
            }

            if (myUser) {
                setUser(myUser);
                // Atualiza o storage com o email confirmado vindo do banco
                if (myUser.email) localStorage.setItem('@App:user_email', myUser.email);
                return true;
            }
        } catch (error) {
            // Silent
        }
        return false;
    };

    // 1. Ao iniciar a tela (F5)
    useEffect(() => {
        const initAuth = async () => {
            try {
                const isValid = await checkAuthRequest();
                if (isValid) {
                    await loadUserProfile();
                } else {
                    setUser(null);
                    localStorage.removeItem('@App:user_email');
                }
            } catch (err) {
                console.error("Erro na verificação de autenticação.");
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    // 2. Login
    const signIn = async (data: User) => {
        await loginRequest(data); // Cria a sessão
        // Salva email provisoriamente para ajudar na identificação pós-login
        if (data.email) localStorage.setItem('@App:user_email', data.email);
        await loadUserProfile();  // Puxa os dados
    };

    // 3. Logout
    const signOut = async () => {
        await logoutRequest();
        setUser(null);
        localStorage.removeItem('@App:user_email');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);