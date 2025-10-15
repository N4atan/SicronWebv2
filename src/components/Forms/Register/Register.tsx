
import BtnPrimary from '../../Button/Primary/BtnPrimary';
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import BtnSecondary from '../../Button/Secondary/BtnSecondary';

import './Register.css';
import Input from '../../Inputs/Input/Input';



export default function RegisterForm() {
    return (
        <div className="form-container">
            {/* Componente do header */}
            <div></div>

            <h1>Bem-Vindo!</h1>
            <p>Veja como é rápido criar a sua conta!</p>

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

            <BtnPrimary
            text='Criar Minha Conta'
            />

            <BtnSecondary
            text='Já possui uma conta?'
            />
        </div>
    )
}