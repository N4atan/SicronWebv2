import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ROLE_OPTIONS, schema_createUser, schema_updateUser } from "../../../utils/userSchemas";
import { User } from "../../../interfaces";
import Input from "../../Inputs/Input/Input";
import { errorUserService, registerUser, updateUser } from "../../../services/user.service";
import z from "zod";


type Props = {
    initialData?: User;
    onSuccess?: () => void;
    onLoading: (isLoading: boolean) => void;
}

export default function UserForm({ initialData, onSuccess, onLoading }: Props) {
    const isEditing = !!initialData;
    const schema = isEditing ? schema_updateUser : schema_createUser;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: (initialData || {}) as any
    })

    const onSubmitUpdate = async (data: z.infer<typeof schema_updateUser>) => {
        onLoading(true);

        try {
            const identifier = initialData?.uuid || initialData?.id;
            if (!identifier) return alert("ID não passado para atualização");


            const success = await updateUser(identifier, data as Partial<User>);
            if (!success) return alert(errorUserService || "Erro ao atualizar usuário");


            alert("Usuário atualizado com sucesso");

            if (onSuccess) onSuccess();

            onLoading(false);

        } catch (error) {
            console.log(error);
            alert(error || "Erro ao atualizar usuário.");
        } finally {
            onLoading(false);
        }
    }

    const onSubmitCreate = async (data: z.infer<typeof schema_createUser>) => {
        onLoading(true);

        try {
            const success = await registerUser(data);

            if (!success) return alert(errorUserService);

            alert('Registrado com Sucesso!');

            if (onSuccess) onSuccess();

            onLoading(false);
        }
        catch (error: unknown) {
            console.log(error);
            alert(error || "Erro ao realizar registro.");
        }
        finally {
            onLoading(false);
        }
    }

    return (
        <form id="entity-form" onSubmit={handleSubmit((isEditing ? onSubmitUpdate : onSubmitCreate) as any)} className="form-entity">
            <div className="container-body">
                <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='default'
                            styleDefault='default'
                            type="text"
                            label="Nome de Usuário"
                            errorMessage={errors.username?.message?.toString()}
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
                            styleDefault='default'
                            type="email"
                            label="E-mail"
                            errorMessage={errors.email?.message?.toString()}
                        />
                    )}
                />
                {/* 
                <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='selection'
                            styleDefault='default'
                            type="select"
                            label="Tipo de Usuário"
                            options={ROLE_OPTIONS}
                            errorMessage={errors.role?.message?.toString()}
                        />
                    )}
                />
                */}
                
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='default'
                            styleDefault='default'
                            type="password"
                            label="Nova Senha"

                            errorMessage={errors.password?.message?.toString()}
                        />
                    )}
                />


            </div>
        </form>
    )
}