
import BtnPrimary from '../../Button/Primary/BtnPrimary';
import Input from '../../Inputs/Input/Input';
import './Contato.css'



export default function ContatoForm() {
    return (
        <form className="contact-form">

            <Input
            variant='default'
            label='Qual é o seu nome?'
            type='text'
            placeholder='Ex.: João da Silva'
            />

            <Input
            variant='default'
            label='Seu e-mail:'
            type='text'
            placeholder='Ex.: joao.silva@email.com'
            />

            <Input
            variant='default'
            label='Qual o assunto?'
            type='text'
            placeholder='Ex.: Dúvida sobre doação'
            />

            <Input
            variant='text-area'
            label='Sua mensagem:'
            type='text'
            placeholder='Descreva sua mensagem aqui...'
            />

            <BtnPrimary
            type='submit'
            text='Enviar Mensagem'
            />

        </form>
    )
}