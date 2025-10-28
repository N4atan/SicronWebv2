
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
                    placeholder='Seu nome'
                />

                <Input
                    variant='default'
                    label='Seu e-mail:'
                    type='text'
                    placeholder='seu@email.com'
                />
            </div>

            <Input
                variant='default'
                label='Qual o assunto?'
                type='text'
                placeholder='Como posso ajudar?'
            />

            <Input
                variant='text-area'
                label='Sua mensagem:'
                type='text'
                placeholder='Escreva sua mensagem aqui'
            />

            <Button
                variant='primary'
                type='submit'
                text='Enviar Mensagem'
            />

        </form>
    )
}