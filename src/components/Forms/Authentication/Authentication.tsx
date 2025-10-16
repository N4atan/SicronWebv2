
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import './Authentication.css';
import Input from '../../Inputs/Input/Input';
import Button from '../../Button/Button';
import { useState } from 'react';

function LoginForm({ eventChangeForm }: { eventChangeForm: () => void }) {
    return (
        <>

            <div>
                <h1>Bem-Vindo de Volta!</h1>
                <p>Insira suas credenciais para acessar sua conta.</p>
            </div>


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
                text='Ainda não possui uma conta?'
                onClick={eventChangeForm}
            />
        </>
    )
};

function RegisterForm({ eventChangeForm }: { eventChangeForm: () => void }) {
    return (
        <>
            <div>
                <h1>Bem-Vindo!</h1>
                <p>Veja como é rápido criar a sua conta.</p>
            </div>

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
                onClick={eventChangeForm}
            />
        </>
    )
}


export default function AuthenticationForm() {
    const [formType, setFormType] = useState('register');

    function handleClickChangeForm(type: 'login' | 'register') {
        console.log(type);
        setFormType(type);
    }


    return (
        <div className="form-container">
            {/* Componente do header */}
            <div></div>

            {formType == 'login' ?
                <LoginForm
                    eventChangeForm={() => handleClickChangeForm('register')}
                />
                :
                <RegisterForm
                    eventChangeForm={() => handleClickChangeForm('login')}
                />
            }

        </div>
    )
}