import Header from "../components/Header/Header";
import Illustration from '../assets/icons/not_found.svg?react'
import Button from "../components/Button/Button";

export default function PageNotFound() {
    return (
        <>



            <main style={{
                maxWidth: '1200px', // Limite maior para desktops
                width: '90%', // Margem segura em mobiles
                margin: '1rem auto',
                minHeight: '80vh', // Ocupa a altura da tela
                display: 'flex',
                flexWrap: 'wrap', // Permite quebrar linha no mobile
                justifyContent: "center",
                alignItems: 'center',
                gap: '3rem', // Espaço entre imagem e texto
            }}>

                <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
                    <Illustration
                        style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                        aria-label="404 page not found illustration"
                    />

                </div>


                <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
                    <h1 style={{
                        color: '#1a1a1a',
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        lineHeight: '1.2'
                    }}>
                        Ops, essa entrega falhou!
                    </h1>

                    <p style={{
                        color: '#555',
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                    }}>
                        O SICRON garante que sua doação chegue ao destino, mas infelizmente não conseguimos entregar esta página. Ela deve ter se perdido no caminho.
                    </p>


                    <Button
                        variant={'secondary'}
                        text={'Voltar para o Início '}
                        onClick={() => window.location.href = '/'}
                    >
                        Voltar para o Início
                    </Button>
                </div>
            </main>
        </>
    )
}