
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import './Authentication.css';
import Input from '../../Inputs/Input/Input';
import Button from '../../Button/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { api, SimplifiedUser } from "../../../services/api";

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
        <div className="auth-form-inner">
            <div className="auth-header">
                <h1 className="auth-title">Bem-Vindo de Volta!</h1>
                <p className="auth-subtitle">Insira suas credenciais para acessar sua conta.</p>
            </div>

            <Input
                variant='default'
                styleDefault='outline-border'
                type="email"
                placeholder="E-mail"
                icon={faEnvelope}
                onChange={(e) => props.setEmail((e.target as HTMLInputElement).value)}
            />

            <Input
                variant='default'
                styleDefault='outline-border'
                type="password"
                placeholder="Senha"
                icon={faLock}
                onChange={(e) => props.setPassword((e.target as HTMLInputElement).value)}
            />

            <Button
                variant='primary'
                text='Entrar na Minha Conta'
                type='submit'
                className="btn-full-width btn-login-primary"
            />

            <Button
                variant='ghost'
                text='Ainda não possui uma conta?'
                type='button'
                onClick={() => props.eventChangeForm('register')}
                className="btn-full-width btn-login-secondary"
            />
        </div>
    )
};

function RegisterForm(props: RegisterFormProps) {
    return (
        <div className="auth-form-inner">
            <div className="auth-header">
                <h1 className="auth-title">Crie sua Conta</h1>
                <p className="auth-subtitle">Junte-se a nós e faça parte da mudança.</p>
            </div>

            <Input
                variant='default'
                styleDefault='outline-border'
                type="text"
                placeholder="Nome de Usuário"
                icon={faUser}
                onChange={(e) => props.setUsername((e.target as HTMLInputElement).value)}
                value={props.username}
            />


            <Input
                variant='default'
                styleDefault='outline-border'
                type="email"
                placeholder="E-mail"
                icon={faEnvelope}
                onChange={(e) => props.setEmail((e.target as HTMLInputElement).value)}
                value={props.email}
            />

            <Input
                variant='default'
                styleDefault='outline-border'
                type="password"
                placeholder="Senha"
                icon={faLock}
                onChange={(e) => props.setPassword((e.target as HTMLInputElement).value)}
                value={props.password}
            />

            <Checkbox
                id='terms'
                text='Declaro que li e concordo com os Termos e Condições de Uso, autorizando o tratamento dos meus dados conforme descrito.'
            />

            <Button
                variant='primary'
                text='Criar Minha Conta'
                type='submit'
                className="btn-full-width btn-login-primary"
            />

            <Button
                variant='ghost'
                text='Já possui uma conta?'
                type='button'
                onClick={() => props.eventChangeForm('login')}
                className="btn-full-width btn-login-secondary"
            />
        </div>
    )
}


export default function AuthenticationForm() {
    const [formType, setFormType] = useState<'login' | 'register'>('register');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function clearData() {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    function anyIsEmpty(): boolean {
        return username.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0;
    }

    function handleClickChangeForm(type: 'login' | 'register') {
        console.log(type);
        setFormType(type);
    }

    async function handleSubmitRegister(event: React.FormEvent) {
        event.preventDefault();

        try {
            if (anyIsEmpty()) return alert('Preencha os campos corretamente!');

            const user = await api.fetchCreateUser({ username, email, password });

            if (!user) {
                console.info(api.errorResponse);
                alert(api.errorResponse);
                return;
            }

            console.table(user);
            localStorage.setItem('userSicron', JSON.stringify(user))

            alert('Registro com sucesso!');
            clearData();

        } catch (error: unknown) {
            console.error(error);
            alert(`Erro no registro: ${error}`);
        }
    }

    function handleSubmitLogin(event: React.FormEvent) {
        event.preventDefault();
    }


    return (
        <form className="form-container" onSubmit={formType == 'register' ? handleSubmitRegister : handleSubmitLogin}>
            {/* Componente do header */}
            <div></div>

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

        </form>
    )
}