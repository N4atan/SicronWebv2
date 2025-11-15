import Card from "../Card/Card";


type Props = {
    name: string;
    src_img?: string;
}


export default function UserProfileCard({ name, src_img }: Props) {
    return (
        <Card
            style={{height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            <div 
                className="container-avatar"
                style={{
                    backgroundColor: '#eee',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px',
                    width: '200px',          // 1. Adicionado para ser um quadrado
                    marginBottom: '1rem',
                    borderRadius: '50%',      // 2. Alterado para círculo
                    overflow: 'hidden'        // 3. Adicionado para cortar a imagem
                }}
            >
                <img 
                    src={src_img || 'https://placehold.co/200'}
                    alt={`Foto de perfil de ${name}`}
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover'    // 4. Alterado para preencher
                    }}
                />
            </div>

            <div className="container-about">
                <h2
                    style={{
                        fontSize: 'clamp(1rem, 1.5rem, 2.5rem)',
                        fontWeight: 700,
                    }}
                >
                    {name}
                </h2>

                {/* Adicionar lógica para botão de edição */}
            </div>
        </Card>
    )
} 