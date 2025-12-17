import Card from "../Card/Card";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { translateRole } from "../../utils/roleTranslator";

type Props = {
    name: string;
    role?: string;
    src_img?: string;
    isMe?: boolean;
    onEdit?: () => void;
}


export default function UserProfileCard({ name, role, src_img, isMe, onEdit }: Props) {
    return (
        <Card
            style={{ height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}
        >
            <div
                className="container-avatar"
                style={{
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '150px',
                    width: '150px',          // 1. Adicionado para ser um quadrado
                    marginBottom: '1rem',
                    borderRadius: '50%',      // 2. Alterado para círculo
                    overflow: 'hidden',        // 3. Adicionado para cortar a imagem
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
            >
                {src_img ? (
                    <img
                        src={src_img}
                        alt={`Foto de perfil de ${name}`}
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'    // 4. Alterado para preencher
                        }}
                    />
                ) : (

                    <span style={{ fontSize: '4rem' }}>
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}


            </div>

            <div className="container-about" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <h2
                    style={{
                        fontSize: 'clamp(1rem, 1.5rem, 2.5rem)',
                        fontWeight: 700,
                        margin: 0
                    }}
                >
                    {name.split(' ')[0]}
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

                    
                </div>

            </div>
        </Card>
    )
} 