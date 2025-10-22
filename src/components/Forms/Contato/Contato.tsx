
import Button from '../../Button/Button';
import Input from '../../Inputs/Input/Input';
import './Contato.css'



export default function ContatoForm() {
    return (
        <form className="contact-form">

            <div className="input-row">

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
            </div>

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

            <Button
                variant='primary'
                type='submit'
                text='Enviar Mensagem'
            />

        </form>
    )
}