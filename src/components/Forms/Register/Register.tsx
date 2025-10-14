
import BtnPrimary from '../../Button/Primary/BtnPrimary';
import { Checkbox } from '../../Inputs/Checkbox/Checkbox';
import { InputIcon } from '../../Inputs/InputIcon/InputIcon';
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import BtnSecondary from '../../Button/Secondary/BtnSecondary';

import './Register.css';


export default function RegisterForm() {
    return (
        <div className="form-container">
            {/* Componente do header */}
            <div></div>

            <h1>Bem-Vindo!</h1>
            <p>Veja como é rápido criar a sua conta!</p>

            <InputIcon
            type="text"
            placeholder="Nome de Usuário"
            iconName={faUser}
            />

            <InputIcon
            type="email"
            placeholder="E-mail"
            iconName={faEnvelope}
            />

            <InputIcon
            type="password"
            placeholder="Senha"
            iconName={faLock}
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