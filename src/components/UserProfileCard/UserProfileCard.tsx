import Card from "../Card/Card";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type Props = {
    name: string;
    src_img?: string;
    onLogout?: () => void;
    isMe?: boolean;
    onEdit?: () => void;
}


export default function UserProfileCard({ name, src_img, onLogout, isMe, onEdit }: Props) {
    return (
        <Card
            style={{ height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}
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

            <div className="container-about" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <h2
                    style={{
                        fontSize: 'clamp(1rem, 1.5rem, 2.5rem)',
                        fontWeight: 700,
                        margin: 0
                    }}
                >
                    {name}
                </h2>

                <div 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}
                >
                    {isMe && (
                        <Button
                            text="Editar Perfil"
                            variant="secondary"
                            onClick={onEdit}
                            style={{ width: '100%' }}
                        />
                    )}

                    {onLogout && (
                        <Button
                            variant="secondary"
                            text="Sair da Conta"
                            onClick={onLogout}
                            style={{ width: '100%' }}
                        />
                    )}
                </div>

            </div>
        </Card>
    )
} 