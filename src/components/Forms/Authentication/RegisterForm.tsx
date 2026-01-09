import { schema_createUser } from "../../../utils/userSchemas"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../../Button/Button"
import Input from "../../Inputs/Input/Input"
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Oval } from 'react-loader-spinner';
import z from "zod"
import { errorUserService, registerUser } from "../../../services/user.service"




interface IRegisterFormProps {
    onChangeForm: () => void;
}

export default function RegisterForm({ onChangeForm }: IRegisterFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        control
    } = useForm({
        resolver: zodResolver(schema_createUser),
        mode: 'all'
    })

    const handleRegister = async (data: z.infer<typeof schema_createUser>) => {
        setIsLoading(true);

        try {
            const userCreated = await registerUser(data);
            
            if (!userCreated) return alert(errorUserService);

            alert('Registrado com Sucesso!');

            alert('Realize seu Login Agora!');
            onChangeForm();
        }
        catch (error: unknown) {
            console.log(error);
            alert(error || "Erro ao realizar registro.");
        }
        finally {
            setIsLoading(false);
        }
    } 


    /*
    async function handleSubmitRegister(event: React.FormEvent) {
        event.preventDefault();

        setIsLoading(true);

        try {
            const userCreated = await registerUser({ username, email, password });

            if (!userCreated) return alert(errorUserService);

            alert('Registrado com Sucesso!');
            clearData();

            alert('Realize seu Login Agora!');
            onChangeForm();
        }
        catch (error: unknown) {
            alert(error);
            console.log(error);
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
        <form onSubmit={handleSubmit(handleRegister)}>
            <div>
                <h1>Bem-Vindo!</h1>
                <p>Veja como é rápido criar a sua conta.</p>
            </div>

            <Controller
                control={control}
                name="username"
                render={({ field }) => (
                    <Input
                        {...field}
                        variant='default'
                        styleDefault='outline-border'
                        type="text"
                        placeholder="Nome de Usuário"
                        icon={faUser}
                        errorMessage={errors.username?.message}
                    />
                )}
            />

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
                text='Criar Minha Conta'
                type='submit'
                disabled={!isValid}
            />

            <Button
                variant='secondary'
                text='Já possui uma conta?'
                type='button'
                onClick={onChangeForm}
            />
        </form>
    )
}