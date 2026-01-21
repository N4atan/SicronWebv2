import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NGO } from "../../../interfaces";
import { AREAS_OPTIONS, schema_ngo, schema_updateNgo } from "../../../utils/ngoSchemas";
import Input from "../../Inputs/Input/Input";
import z from "zod";
import { errorOngService, registerOng, updateOng } from "../../../services/ong.service";
import Button from "../../Button/Button";
import { faBuildingNgo, faEnvelope, faIdCard, faLocationDot, faPhone, faStore, faTreeCity } from "@fortawesome/free-solid-svg-icons";


type Props = {
    initialData?: NGO;
    onSuccess?: () => void;
    onLoading: (isLoading: boolean) => void;
}


export default function NGOForm({ initialData, onSuccess, onLoading }: Props) {
    const isEditing = !!initialData;
    const schema = isEditing ? schema_updateNgo : schema_ngo;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: (initialData || {}) as any
    });

    const onSubmitCreate = async (data: z.infer<typeof schema_ngo>) => {
        onLoading(true);

        try {
            const success = await registerOng(data);
            if (!success) return alert(errorOngService || "Erro ao criar ONG");

            alert("ONG criada com sucesso");

            if (onSuccess) onSuccess();


        } catch (error) {
            console.error(error);
            alert(error || "Erro ao criar ONG.");
        } finally {
            onLoading(false);
        }
    }

    const onSubmitUpdate = async (data: z.infer<typeof schema_updateNgo>) => {
        onLoading(true);

        try {
            const identifier = initialData?.uuid || initialData?.id;
            if (!identifier) return alert("ID não passado para atualização");


            const success = await updateOng(String(identifier), data as Partial<NGO>);
            if (!success) return alert(errorOngService || "Erro ao atualizar ONG");


            alert("ONG atualizada com sucesso");

            if (onSuccess) onSuccess();

        } catch (error) {
            console.error(error);
            alert(error || "Erro ao atualizar ONG.");
        } finally {
            onLoading(false);
        }
    }


    return (
        <form id="entity-form" className="form-entity" onSubmit={handleSubmit((isEditing ? onSubmitUpdate : onSubmitCreate) as any)}>
            <div className="container-body">
                <div className="row-col2">
                    <Controller
                        control={control}
                        name="trade_name"
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Nome Fantasia"
                                icon={faStore}
                                placeholder="Nome popular da ONG"
                                errorMessage={errors.trade_name?.message?.toString()}
                            />
                        )}
                    />


                    <Controller
                        control={control}
                        name="local"
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                label="Local de Atuação"
                                icon={faTreeCity}
                                type="text"
                                placeholder="Cidade - Estado (Ex: São Paulo - SP)"
                                errorMessage={errors.local?.message?.toString()}
                            />
                        )}
                    />
                </div>

                <div className="row-col2">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Razão Social"
                                icon={faBuildingNgo}
                                placeholder="Ex: Associação Esperança "
                                errorMessage={errors.name?.message?.toString()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="cnpj"
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="CNPJ"
                                icon={faIdCard}
                                placeholder="(Apenas números)"
                                errorMessage={errors.cnpj?.message?.toString()}
                            />
                        )}
                    />
                </div>

                <Controller
                    control={control}
                    name="area"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='selection'
                            styleDefault='default'
                            type="text"
                            options={AREAS_OPTIONS}
                            label="Área de Atuação"
                            placeholder="Selecione a área principal"
                            errorMessage={errors.area?.message?.toString()}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='text-area'
                            styleDefault='default'
                            type="text"
                            label="Descrição"
                            placeholder="Descreva a missão, atividades e público-alvo da ONG... (Máx. 255 caracteres)"
                            errorMessage={errors.description?.message?.toString()}
                        />
                    )}
                />

                <div className="row-col2">
                    <Controller
                        control={control}
                        name="phone_number"
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Telefone de Contato"
                                icon={faPhone}
                                placeholder="(DDD) 90000-0000"
                                errorMessage={errors.phone_number?.message?.toString()}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="contact_email"
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="E-mail de Contato"
                                icon={faEnvelope}
                                placeholder="contato@ong.exemplo.com"
                                errorMessage={errors.contact_email?.message?.toString()}
                            />
                        )}
                    />
                </div>

            </div>
        </form>
    );
}