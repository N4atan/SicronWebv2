
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import './Authentication.css';
import Input from '../../Inputs/Input/Input';
import Button from '../../Button/Button';
import { Dispatch, SetStateAction, useState } from 'react';

import { errorUserService, loginUser, registerUser } from '../../../services/user.service';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    function clearData(){
        setUsername('');
        setEmail('');
        setPassword('');
    }

    function anyIsEmpty(letter: string): boolean{
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

       try 
       {
            // Checa inputs vazios.
            if ( anyIsEmpty('r') ) return alert('Preencha todos os campos!');

            const userCreated = await registerUser({username, email, password});

            if ( !userCreated ) return alert(errorUserService);

            alert('Registrado com Sucesso!');
            clearData();

            alert('Realize seu Login Agora!');
            setFormType('login');
       }
       catch (error: unknown)
       {
            alert(error);
            console.log(error);
       }
    }

    async function handleSubmitLogin(event: React.FormEvent) {
        event.preventDefault();

        try 
       {
            // Checa inputs vazios.
            if ( anyIsEmpty('l') ) return alert('Preencha todos os campos!');

            console.log('Dados a serem enviados:', email, password)

            const isLogged = await loginUser({ email, password });

            if ( !isLogged ) return alert(errorUserService);

            alert('Logado com Sucesso!');
            clearData();

            

            navigate(`/perfil?email=${email}`);

       }
       catch (error: unknown)
       {
            alert(error);
            console.log(error);
       }
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