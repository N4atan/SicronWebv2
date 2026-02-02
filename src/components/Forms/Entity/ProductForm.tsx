import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Product, UserRole } from "../../../interfaces";
import { useAuth } from "../../../contexts/AuthContext";
import { schema_createProduct, schema_updateProduct, schema_ngoProduct, schema_updateNgoProduct, schema_supplierProduct, schema_updateSupplierProduct, CATEGORIES_OPTIONS } from "../../../utils/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../Inputs/Input/Input";
import { updateProduct, createProduct, addProductToNGO, updateNGOProduct, addSupplierProduct, updateSupplierProduct } from "../../../services/product.service";
import { z } from 'zod';

type Props = {
    initialData?: Product | any; // Generics or any to support NGOProduct/SupplierProduct
    typeEntity?: 'product' | 'ngoProduct' | 'supplierProduct';
    parentUuid?: string; // ID da ONG ou Fornecedor (necessário para CREATE)
    onSuccess?: () => void;
    onLoading: (isLoading: boolean) => void;
    availableOptions?: Product[];
}

export default function ProductForm({ initialData, onSuccess, onLoading, typeEntity = 'product', parentUuid, availableOptions = [] }: Props) {
    const { user } = useAuth();
    // Fix: check if it has ID to consider it editing. 
    // Just passing partial data (like name) for creation shouldn't trigger edit mode.
    const isEditing = !!(initialData && (initialData.uuid || initialData.id));
    const isDisabled = isEditing && user?.role !== UserRole.ADMIN && typeEntity === 'product'; // Only verify admin for global products

    let schema: any = isEditing ? schema_updateProduct : schema_createProduct;

    if (typeEntity === 'ngoProduct') {
        schema = isEditing ? schema_updateNgoProduct : schema_ngoProduct;
    } else if (typeEntity === 'supplierProduct') {
        schema = isEditing ? schema_updateSupplierProduct : schema_supplierProduct;
    }

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

    // Watch for Name selection to determine Max Qty
    const selectedNameValue = useWatch({ control, name: 'name' });

    let maxQuantity = 999999;

    if (typeEntity === 'ngoProduct' && !isEditing && selectedNameValue) {
        if (selectedNameValue.includes("::")) {
            const [_, spId] = selectedNameValue.split("::");
            for (const prod of (availableOptions || [])) {
                const foundSp = prod.supplierProducts?.find((sp: any) => String(sp.id) === String(spId));
                if (foundSp) {
                    maxQuantity = foundSp.availableQuantity;
                    break;
                }
            }
        }
    }

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmitUpdate = async (data: any) => {
        onLoading(true);

        try {
            const identifier = initialData?.uuid || initialData?.id;
            if (!identifier && typeEntity === 'product') return alert("ID não passado para atualização");

            let success = false;

            if (typeEntity === 'product') {
                success = await updateProduct(identifier, data);
            } else if (typeEntity === 'ngoProduct') {
                // Para NGOProduct, o identifier é o ID do vinculo
                success = await updateNGOProduct(String(identifier), data);
            } else if (typeEntity === 'supplierProduct') {
                success = await updateSupplierProduct(String(identifier), data);
            }

            if (!success) return alert("Erro ao atualizar.");

            alert("Atualizado com sucesso");
            if (onSuccess) onSuccess();

        } catch (error) {
            console.log(error);
            alert(error || "Erro ao atualizar.");
        } finally {
            onLoading(false);
        }
    }

    const onSubmitCreate = async (data: any) => {
        onLoading(true);

        try {
            let success = false;

            if (typeEntity === 'product') {
                const res = await createProduct(data);
                success = !!res;
            } else if (typeEntity === 'ngoProduct') {
                if (!parentUuid) return alert("Erro: ID da ONG não informado.");
                const res = await import("../../../services/product.service").then(m => m.addProductToNGO(parentUuid, data));
                success = !!res;
            } else if (typeEntity === 'supplierProduct') {
                if (!parentUuid) return alert("Erro: ID do Fornecedor não informado.");
                const res = await import("../../../services/product.service").then(m => m.addSupplierProduct(parentUuid, data));
                success = !!res;
            }

            if (!success) return alert("Erro ao criar.");

            alert("Criado com sucesso");
            if (onSuccess) onSuccess();

        } catch (error) {
            console.log(error);
            alert(error || "Erro ao criar.");
        } finally {
            onLoading(false);
        }
    }

    // Prepare Options for Direct Offers
    let offerOptions: any[] = [];
    if (typeEntity === 'ngoProduct' && !isEditing) {
        // Flatten available products into offers
        offerOptions = (availableOptions || []).flatMap(prod => {
            const offers = prod.supplierProducts || [];
            if (offers.length === 0) return []; // Should not happen due to Dashboard filter but safe check

            return offers.map((sp: any) => ({
                label: `${prod.name} - ${sp.supplier?.trade_name || 'Fornecedor'} (R$ ${Number(sp.price).toFixed(2)}) - Disp: ${sp.availableQuantity}`,
                value: `${prod.name}::${sp.id}` // Composite Key
            }));
        });
    }

    return (
        <form id='entity-form' onSubmit={handleSubmit((data) => {
            // Intercept submit to clean data? 
            // Actually, data will contain 'supplier_product_id' if we register it.
            // But 'data.name' will be the composite string if we don't handle it carefully?
            // No, Controller onChange handles the field value.
            // Let's rely on the submit handler handling the extra fields.
            const finalData = { ...data };
            if (typeEntity === 'ngoProduct' && !isEditing) {
                // The 'name' field in form state might be "Name::ID" if we just bound it directly.
                // We need to ensure 'name' sent to API is just the Name.
                if (finalData.name && finalData.name.includes("::")) {
                    const [realName, spId] = finalData.name.split("::");
                    finalData.name = realName;
                    finalData.supplier_product_id = spId;
                }
            }
            return isEditing ? onSubmitUpdate(finalData) : onSubmitCreate(finalData);
        })}>
            <div className="container-body">


                {(typeEntity === 'product') && (
                    <>
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
                    </>
                )}

                {typeEntity === 'ngoProduct' && (
                    <>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant={isEditing ? 'default' : 'selection'}
                                    styleDefault='default'
                                    type="text"
                                    label="Selecione a Oferta (Produto - Fornecedor - Preço)"
                                    placeholder={isEditing ? "Nome do produto" : "Escolha uma oferta..."}
                                    options={isEditing ? undefined : offerOptions}
                                    errorMessage={errors.name?.message?.toString()}
                                    disabled={isEditing}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="quantity"
                            rules={{
                                required: "Quantidade é obrigatória",
                                min: { value: 1, message: "Mínimo 1" },
                                max: { value: maxQuantity, message: `O estoque disponível é apenas ${maxQuantity}` }
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant='default'
                                    styleDefault='default'
                                    type="number"
                                    label={`Quantidade Necessária (Máx: ${maxQuantity === 999999 ? '-' : maxQuantity})`}
                                    placeholder="Ex: 10"
                                    errorMessage={errors.quantity?.message?.toString()}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="notes"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant='text-area'
                                    styleDefault='default'
                                    type="text"
                                    label="Notas / Observações"
                                    placeholder="Descreva a finalidade do item"
                                    errorMessage={errors.notes?.message?.toString()}
                                />
                            )}
                        />
                    </>
                )}

                {typeEntity === 'supplierProduct' && (
                    <>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant={isEditing ? 'default' : 'selection'}
                                    styleDefault='default'
                                    type="text"
                                    label="Produto"
                                    placeholder={isEditing ? "Nome do produto" : "Selecione o produto"}
                                    options={isEditing ? undefined : (availableOptions || []).map(p => p.name)}
                                    errorMessage={errors.name?.message?.toString()}
                                    disabled={isEditing}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="price"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant='default'
                                    styleDefault='default'
                                    type="number"
                                    label="Preço Unitário (R$)"
                                    placeholder="0.00"
                                    errorMessage={errors.price?.message?.toString()}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="availableQuantity"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant='default'
                                    styleDefault='default'
                                    type="number"
                                    label="Quantidade Disponível"
                                    placeholder="Ex: 50"
                                    errorMessage={errors.availableQuantity?.message?.toString()}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="avgDeliveryTimeDays"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    variant='default'
                                    styleDefault='default'
                                    type="number"
                                    label="Tempo de Entrega (Dias)"
                                    placeholder="Ex: 2"
                                    errorMessage={errors.avgDeliveryTimeDays?.message?.toString()}
                                />
                            )}
                        />
                    </>
                )}
            </div>
        </form>
    )
}