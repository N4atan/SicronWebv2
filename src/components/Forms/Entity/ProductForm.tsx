import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Product, UserRole } from "../../../interfaces";
import { useAuth } from "../../../contexts/AuthContext";
import { schema_createProduct, schema_updateProduct, CATEGORIES_OPTIONS } from "../../../utils/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../Inputs/Input/Input";
import { updateProduct, createProduct } from "../../../services/product.service";
import { z } from 'zod';

type Props = {
    initialData?: Product;
    onSuccess?: () => void;
    onLoading: (isLoading: boolean) => void;
}

export default function ProductForm({ initialData, onSuccess, onLoading }: Props) {
    const { user } = useAuth();
    const isEditing = !!initialData;
    const isDisabled = isEditing && user?.role !== UserRole.ADMIN;

    const schema = isEditing ? schema_updateProduct : schema_createProduct;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: (initialData || {}) as any
    })

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmitUpdate = async (data: z.infer<typeof schema_updateProduct>) => {
        onLoading(true);

        try {
            const identifier = initialData?.uuid;
            if (!identifier) return alert("ID não passado para atualização");

            const success = await updateProduct(identifier, data);
            if (!success) return alert("Erro ao atualizar produto");

            alert("Produto atualizado com sucesso");

            if (onSuccess) onSuccess();

            onLoading(false);

        } catch (error) {
            console.log(error);
            alert(error || "Erro ao atualizar produto.");
        } finally {
            onLoading(false);
        }
    }

    const onSubmitCreate = async (data: z.infer<typeof schema_createProduct>) => {
        onLoading(true);

        try {
            const success = await createProduct(data);
            if (!success) return alert("Erro ao criar produto");

            alert("Produto criado com sucesso");

            if (onSuccess) onSuccess();

            onLoading(false);
        } catch (error) {
            console.log(error);
            alert(error || "Erro ao criar produto.");
        } finally {
            onLoading(false);
        }
    }

    return (
        <form id='entity-form' onSubmit={handleSubmit((isEditing ? onSubmitUpdate : onSubmitCreate) as any)}>
            <div className="container-body">
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='default'
                            styleDefault='default'
                            type="text"
                            label="Nome do produto"
                            placeholder="Ex: Cesta Básica, Arroz 5kg..."
                            errorMessage={errors.name?.message?.toString()}
                            disabled={isDisabled}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <Input
                            {...field}
                            variant='selection'
                            styleDefault='default'
                            type="text"
                            label="Categoria"
                            placeholder="Selecione uma categoria"
                            options={CATEGORIES_OPTIONS}
                            errorMessage={errors.category?.message?.toString()}
                            disabled={isEditing}
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
                            type="description"
                            label="Descrição (Opcional)"
                            placeholder="Detalhes do produto..."
                            errorMessage={errors.description?.message?.toString()}
                        />
                    )}
                />
            </div>
        </form>
    )
}