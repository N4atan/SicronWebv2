import { faUser } from '@fortawesome/free-solid-svg-icons';
import BtnPrimary from '../../Button/Primary/BtnPrimary';
import Input from '../../Inputs/InputIcon/Input';
import './Contato.css'


export default function ContatoForm() {
    return (
        <form className="contact-form">

            
            
            <Input 
            variant='default'
            label='Nome'
            type='text'
            placeholder='Qual é o seu nome?'
            />

            

            

            <BtnPrimary 
            type='submit'
            text='Enviar Mensagem'
            />

        </form>
    )
}