import { useState, FormEvent } from 'react';
import Button from '../../Button/Button';
import Input from '../../Inputs/Input/Input';
import './Contato.css';

interface ContatoFormProps {
    recipientEmail?: string;
}

export default function ContatoForm({ recipientEmail = "mauriciolorenzinvest@gmail.com" }: ContatoFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert("Por favor, preencha os campos obrigatórios.");
            return;
        }

        setLoading(true);

        // URL do Webhook do n8n (Produção)
        const N8N_WEBHOOK_URL = "https://desenvolveae-n8n.cloudfy.cloud/webhook/bff3eea8-64ca-4806-8b4e-ec0998b62228";


        const data = {
            sender_name: name,
            sender_email: "ariellorenz24@gmail.com", // Email validado na Brevo
            recipient_email: "contato@sicron.com", // Destinatário fixo
            visitor_email: email, // Email preenchido no formulário (Para usar no Reply-To)
            subject: subject || "Novo Contato via Site",
            message: message
        };

        try {
            // Envia para o n8n
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Mensagem enviada com sucesso!");
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                console.error("Erro n8n:", response.status);
                alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão ao enviar formulário.");
        } finally {
            setLoading(false);
        }
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
                text={loading ? 'Enviando...' : 'Enviar Mensagem'}
                disabled={loading}
            />
        </form>
    );
}