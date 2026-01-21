import { schema_loginUser } from "../../../utils/userSchemas"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../../Button/Button"
import Input from "../../Inputs/Input/Input"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Oval } from "react-loader-spinner"
import z from "zod"
import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"




interface ILoginFormProps {
    onChangeForm: () => void;
}

export default function LoginForm({ onChangeForm }: ILoginFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        control
    } = useForm({
        resolver: zodResolver(schema_loginUser),
        mode: 'all'
    })

    const handleLoginSubmit = async (data: z.infer<typeof schema_loginUser>) => {
        setIsLoading(true);
        console.log(data)

        try {
            await signIn(data);

            alert('Logado com Sucesso!');

            navigate(`/perfil/me`);
        }
        catch (error: unknown) {
            console.log(error);
            alert(error || "Erro ao realizar login.");
        }
        finally {
            setIsLoading(false);
        }
    }

    /*
    async function handleSubmitLogin(event: React.FormEvent) {
        event.preventDefault();


        setIsLoading(true); 

        try {
            // O CONTEXTO FAZ TUDO:
            // 1. Faz o POST /login
            // 2. Valida o Cookie
            // 3. Carrega os dados do usuário
            await signIn({ email, password });

            alert('Logado com Sucesso!');

            clearData();

            // Redireciona
            navigate(`/perfil/me`);

        } catch (error: any) {
            // Se o signIn falhar (ex: senha errada), ele lança erro e cai aqui
            console.error(error);
            alert(error.message || "Erro ao realizar login.");
        } finally {
            setIsLoading(false); // Desativa o loading independentemente do resultado
        }
    }
    */

    if (isLoading)
        return <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{ alignSelf: 'center' }}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />

    return (
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div>
                <h1>Bem-Vindo de Volta!</h1>
                <p className="subtitle-form">Insira suas credenciais para acessar sua conta.</p>
            </div>

            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <Input
                        {...field}
                        variant='default'
                        styleDefault='outline-border'
                        type="email"
                        placeholder="E-mail"
                        icon={faEnvelope}
                        errorMessage={errors.email?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field }) => (
                    <Input
                        {...field}
                        variant='default'
                        styleDefault='outline-border'
                        type="password"
                        placeholder="Senha"
                        icon={faLock}
                        errorMessage={errors.password?.message}
                    />
                )}
            />


            <Button
                variant='primary'
                text='Entrar na Minha Conta'
                type='submit'
                disabled={!isValid}
            />

            <Button
                variant='secondary'
                text='Ainda não possui uma conta?'
                type='button'
                onClick={onChangeForm}
            />

        </form>
    )
};