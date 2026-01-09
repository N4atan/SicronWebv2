
import './Authentication.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Oval } from 'react-loader-spinner';
import { useState } from 'react';




export default function AuthenticationForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { signIn, loading } = useAuth();

    const navigate = useNavigate();

    /*
    function handleClickChangeForm(type: string) {
        setFormType(type);
    }

    
    async function handleSubmitLogin(event: React.FormEvent) {
        event.preventDefault();


        setIsLoading(true); 

        try {
            // O CONTEXTO FAZ TUDO:
            // 1. Faz o POST /login
            // 2. Valida o Cookie
            // 3. Carrega os dados do usuário
            await signIn({ email, password });

            alert('Logado com Sucesso!');

            clearData();

            // Redireciona
            navigate(`/perfil/me`);

        } catch (error: any) {
            // Se o signIn falhar (ex: senha errada), ele lança erro e cai aqui
            console.error(error);
            alert(error.message || "Erro ao realizar login.");
        } finally {
            setIsLoading(false); // Desativa o loading independentemente do resultado
        }
    }
    */


    return (
        <div className="form-container">
            {/* Componente do header */}
            <div></div>

            {isLogin ? <LoginForm onChangeForm={() => setIsLogin(false)} /> : <RegisterForm onChangeForm={() => setIsLogin(true)} />}
        </div>
    )
}