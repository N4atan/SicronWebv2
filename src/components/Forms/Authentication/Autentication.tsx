
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import './Autentication.css';
import Input from '../../Inputs/Input/Input';
import Button from '../../Button/Button';
import { useState } from 'react';

function LoginForm({ eventChangeForm }) {
    return (
        <>

            <h1>Bem-Vindo de Volta!</h1>
            <p>Insira suas credenciais para acessar sua conta.</p>


            <Input
                variant='outline-border'
                type="email"
                placeholder="E-mail"
                icon={faEnvelope}
            />

            <Input
                variant='outline-border'
                type="password"
                placeholder="Senha"
                icon={faLock}
            />

            <Button
                variant='primary'
                text='Entrar na Minha Conta'
            />

            <Button
                variant='secondary'
                text='Criar uma Conta'
                onClick={eventChangeForm('register')}
            />
        </>
    )
};

function RegisterForm({ eventChangeForm }) {
    return (
        <>
            <h1>Bem-Vindo!</h1>
            <p>Veja como é rápido criar a sua conta.</p>

            <Input
                variant='outline-border'
                type="text"
                placeholder="Nome de Usuário"
                icon={faUser}
            />


            <Input
                variant='outline-border'
                type="email"
                placeholder="E-mail"
                icon={faEnvelope}
            />

            <Input
                variant='outline-border'
                type="password"
                placeholder="Senha"
                icon={faLock}
            />

            <Checkbox
                id='terms'
                text='Concordo que minha alma seja processada e consumida para os devidos fins que constamnos termos e condições de usuários'
            />

            <Button
                variant='primary'
                text='Criar Minha Conta'
            />

            <Button
                variant='secondary'
                text='Já possui uma conta?'
                onClick={() => eventChangeForm('login')}
            />
        </>
    )
}


export default function AutenticationForm({ type }: { type: 'login' | 'register' }) {
    const [formType, setFormType] = useState(type);


    return (
        <div className="form-container">
            {/* Componente do header */}
            <div></div>

            {type === 'login' ?
                <LoginForm
                    eventChangeForm={(form) => () => setFormType(form)}
                />
                :
                <RegisterForm
                    eventChangeForm={(form) => () => setFormType(form)}
                />
            }

        </div>
    )
}