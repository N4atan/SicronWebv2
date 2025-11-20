
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
                text='Concordo que minha alma seja processada e consumida para os devidos fins que constamnos termos e condições de usuários'
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
    const [ formType, setFormType ] = useState<'login' | 'register'>('register');
    const [ username, setUsername ] = useState<string>('');
    const [ email   , setEmail    ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    function clearData(){
        setUsername('');
        setEmail('');
        setPassword('');
    }

    function anyIsEmpty(): boolean{
        return username.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0;
    }
    
    function handleClickChangeForm(type: 'login' | 'register') {
        console.log(type);
        setFormType(type);
    }

    async function handleSubmitRegister(event: React.FormEvent) {
        event.preventDefault();

        try {
            if(anyIsEmpty()) return alert('Preencha os campos corretamente!');
            
            const user = await api.fetchCreateUser({username, email, password});

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
        <form className="form-container" onSubmit={formType == 'register'? handleSubmitRegister : handleSubmitLogin}>
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