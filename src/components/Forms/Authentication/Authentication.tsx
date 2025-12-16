
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import './Authentication.css';
import Input from '../../Inputs/Input/Input';
import Button from '../../Button/Button';
import { Dispatch, SetStateAction, useState } from 'react';

import { errorUserService, registerUser } from '../../../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Oval } from 'react-loader-spinner';

interface LoginFormProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    eventChangeForm: (text: string) => void;
}

interface RegisterFormProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    eventChangeForm: (text: string) => void;
}

function LoginForm(props: LoginFormProps) {
    return (
        <>

            <div>
                <h1>Bem-Vindo de Volta!</h1>
                <p>Insira suas credenciais para acessar sua conta.</p>
            </div>


            <Input
                variant='default'
                styleDefault='outline-border'
                type="email"
                placeholder="E-mail"
                icon={faEnvelope}
                onChange={(e) => props.setEmail((e.target as HTMLInputElement).value.trim())}
            />

            <Input
                variant='default'
                styleDefault='outline-border'
                type="password"
                placeholder="Senha"
                icon={faLock}
                onChange={(e) => props.setPassword((e.target as HTMLInputElement).value.trim())}
            />

            <Button
                variant='primary'
                text='Entrar na Minha Conta'
                type='submit'
            />

            <Button
                variant='secondary'
                text='Ainda não possui uma conta?'
                type='button'
                onClick={() => props.eventChangeForm('register')}
            />
        </>
    )
};

function RegisterForm(props: RegisterFormProps) {
    return (
        <>
            <div>
                <h1>Bem-Vindo!</h1>
                <p>Veja como é rápido criar a sua conta.</p>
            </div>

            <Input
                variant='default'
                styleDefault='outline-border'
                type="text"
                placeholder="Nome de Usuário"
                icon={faUser}
                onChange={(e) => props.setUsername((e.target as HTMLInputElement).value.trim())}
                value={props.username}
            />


            <Input
                variant='default'
                styleDefault='outline-border'
                type="email"
                placeholder="E-mail"
                icon={faEnvelope}
                onChange={(e) => props.setEmail((e.target as HTMLInputElement).value.trim())}
                value={props.email}
            />

            <Input
                variant='default'
                styleDefault='outline-border'
                type="password"
                placeholder="Senha"
                icon={faLock}
                onChange={(e) => props.setPassword((e.target as HTMLInputElement).value.trim())}
                value={props.password}
            />
           

            <Button
                variant='primary'
                text='Criar Minha Conta'
                type='submit'
            />

            <Button
                variant='secondary'
                text='Já possui uma conta?'
                type='button'
                onClick={() => props.eventChangeForm('login')}
            />
        </>
    )
}


export default function AuthenticationForm() {
    const [formType, setFormType] = useState<'login' | 'register'>('register');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { signIn, loading } = useAuth();

    const navigate = useNavigate();

    function clearData() {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    function anyIsEmpty(letter: string): boolean {
        if (letter == 'r') {
            return username.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0;
        }

        if (letter == 'l') {
            return email.trim().length == 0 || password.trim().length == 0;
        }

        else {
            return true;
        }
    }

    function handleClickChangeForm(type: 'login' | 'register') {
        setFormType(type);
        clearData();
    }

    async function handleSubmitRegister(event: React.FormEvent) {
        event.preventDefault();

        try {
            // Checa inputs vazios.
            if (anyIsEmpty('r')) return alert('Preencha todos os campos!');

            const userCreated = await registerUser({ username, email, password });

            if (!userCreated) return alert(errorUserService);

            alert('Registrado com Sucesso!');
            clearData();

            alert('Realize seu Login Agora!');
            setFormType('login');
        }
        catch (error: unknown) {
            alert(error);
            console.log(error);
        }
    }

    async function handleSubmitLogin(event: React.FormEvent) {
        event.preventDefault();

        // Validação básica
        if (anyIsEmpty('l')) return alert('Preencha todos os campos!');

        setIsLoading(true); // Ativa o loading local para mostrar o Spinner

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


    return (
        <form className="form-container" onSubmit={formType == 'register' ? handleSubmitRegister : handleSubmitLogin}>
            {/* Componente do header */}
            <div></div>

            {isLoading ? (
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    wrapperStyle={{ alignSelf: 'center' }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}

                />
            ) : (
                <>
                    {formType == 'login' ?
                        <LoginForm
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            eventChangeForm={() => handleClickChangeForm('register')}
                        />
                        :
                        <RegisterForm
                            username={username}
                            setUsername={setUsername}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            eventChangeForm={() => handleClickChangeForm('login')}
                        />
                    }
                </>
            )}

        </form>
    )
}