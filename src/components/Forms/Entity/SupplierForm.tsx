import { useState } from "react";
import { Supplier } from "../../../interfaces";
import { schema_updateSupplier, schema_supplier } from "../../../utils/supplierSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Input from "../../Inputs/Input/Input";
import { faBuilding, faCity, faEarthAmericas, faEnvelope, faEnvelopesBulk, faFileInvoice, faGlobe, faIdCard, faLandmark, faLocationDot, faMap, faMapPin, faPhone, faRoad, faStamp, faStore, faTreeCity } from "@fortawesome/free-solid-svg-icons";
import z from "zod";
import { errorSupplierService, registerSupplier, updateSupplier } from "../../../services/supplier.service";




type Props = {
    initialData?: Supplier;
    onLoading: (isLoading: boolean) => void;
    onSuccess: () => void;
}



export default function SupplierForm({ onLoading, onSuccess, initialData }: Props) {
    const isEdit = !!initialData;
    const schema = isEdit ? schema_updateSupplier : schema_supplier;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: (initialData || {}) as any
    });

    const onSubmitCreate = async (data: z.infer<typeof schema_supplier>) => {
        try {
            onLoading(true);

            const response = await registerSupplier(data);

            if (!response)
                return alert(errorSupplierService || `Erro desconhecido ao cadastrar Fornecedor.`);


            onSuccess();

        } catch (error) {
            alert(error || `Erro desconhecido ao cadastrar Fornecedor.`);
            console.error(error)
        } finally {
            onLoading(false);
        }
    }

    // Ainda falta implementar a atualização 
    const onSubmitUpdate = async (data: z.infer<typeof schema_updateSupplier>) => {
        console.log('Implementar atualização');
        alert('Implementar atualização');
    }

    return (
        <form id="entity-form" className="form-entity" onSubmit={handleSubmit((isEdit ? onSubmitUpdate : onSubmitCreate) as any)}
        >
            <div className="container-body">
                <Controller
                    name="tradeName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='default'
                            styleDefault='default'
                            type="text"
                            label="Nome Fantasia"
                            icon={faStore}
                            placeholder="Ex: Supermercado Preço Bom"
                            errorMessage={errors.tradeName?.message?.toString()}
                        />
                    )}
                />

                <div className="row-col2">
                    <Controller
                        name="companyName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Razão Social"
                                icon={faBuilding}
                                placeholder="Ex: Supermercado Preço Bom Ltda"
                                errorMessage={errors.companyName?.message?.toString()}
                            />
                        )}
                    />

                    <Controller
                        name="cnpj"
                        control={control}
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

                <div className="row-col2">
                    <Controller
                        name='state'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Estado"
                                icon={faEarthAmericas}
                                placeholder="Ex: SP (Opcional)"
                                errorMessage={errors.state?.message?.toString()}
                            />
                        )}
                    />

                    <Controller
                        name='city'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Cidade"
                                icon={faTreeCity}
                                placeholder="Ex: São Paulo (Opcional)"
                                errorMessage={errors.city?.message?.toString()}
                            />
                        )}
                    />

                </div>

                <div className="row-col2">
                    <Controller
                        name='postalCode'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="CEP"
                                icon={faEnvelopesBulk}
                                placeholder="Ex: 00000-000 (Opcional)"
                                errorMessage={errors.postalCode?.message?.toString()}
                            />
                        )}
                    />

                    <Controller
                        name='address'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Endereço"
                                icon={faRoad}
                                placeholder="Ex: Rua das Flores, 123 (Opcional)"
                                errorMessage={errors.address?.message?.toString()}
                            />
                        )}
                    />
                </div>

                <div className="row-col2">
                    <Controller
                        name='phone'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Telefone"
                                icon={faPhone}
                                placeholder="Ex: (11) 99999-9999 (Opcional)"
                                errorMessage={errors.phone?.message?.toString()}
                            />
                        )}
                    />

                    <Controller
                        name='contactEmail'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="E-mail Comercial"
                                icon={faEnvelope}
                                placeholder="Ex: empresa@empresa.com"
                                errorMessage={errors.contactEmail?.message?.toString()}
                            />
                        )}
                    />
                </div>

                <div className="row-col2">
                    <Controller
                        name='stateRegistration'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Inscrição Estadual"
                                icon={faStamp}
                                placeholder="Ex: 123.456.789.000 (Opcional)"
                                errorMessage={errors.stateRegistration?.message?.toString()}
                            />
                        )}
                    />

                    <Controller
                        name='municipalRegistration'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                variant='default'
                                styleDefault='default'
                                type="text"
                                label="Inscrição Municipal"
                                icon={faLandmark}
                                placeholder="Ex: 123.456.789 (Opcional)"
                                errorMessage={errors.municipalRegistration?.message?.toString()}
                            />
                        )}
                    />
                </div>

            </div>
        </form>
    )

}