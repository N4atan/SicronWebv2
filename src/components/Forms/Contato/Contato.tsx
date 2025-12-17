import { useState, FormEvent } from 'react';
import Button from '../../Button/Button';
import Input from '../../Inputs/Input/Input';
import './Contato.css';

interface ContatoFormProps {
    recipientEmail?: string;
}

export default function ContatoForm({ recipientEmail = "contato@sicron.com" }: ContatoFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Mantemos o campo para o usuário digitar, mas no mailto ele usará o dele
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name || !message) {
            alert("Por favor, preencha pelo menos seu nome e a mensagem.");
            return;
        }

        // Monta o link mailto
        // Estrutura: mailto:DESTINO?subject=ASSUNTO&body=CORPO
        const bodyContent = `Nome: ${name}\nEmail de contato: ${email}\n\nMensagem:\n${message}`;

        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject || "Contato pelo Site")}&body=${encodeURIComponent(bodyContent)}`;

        // Abre o cliente de email
        window.location.href = mailtoLink;
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-row">
                <Input
                    variant='default'
                    label='Qual é o seu nome?'
                    type='text'
                    placeholder='Seu nome'
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                />

                <Input
                    variant='default'
                    label='Seu e-mail:'
                    type='email'
                    placeholder='seu@email.com'
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                />
            </div>

            <Input
                variant='default'
                label='Qual o assunto?'
                type='text'
                placeholder='Como posso ajudar?'
                value={subject}
                onChange={(e: any) => setSubject(e.target.value)}
            />

            <Input
                variant='text-area'
                label='Sua mensagem:'
                type='text'
                placeholder='Escreva sua mensagem aqui'
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
            />

            <Button
                variant='primary'
                type='submit'
                text='Enviar Mensagem'
            />
        </form>
    );
}