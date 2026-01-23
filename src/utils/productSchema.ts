import { z } from 'zod';

export const CATEGORIES_OPTIONS = [
    'Alimento',
    'Medicamento',
    'Higiene Pessoal',
    'Limpeza',
    'Roupas',
    'Calçados',
    'Material Escolar',
    'Brinquedos',
    'Cobertores',
    'Móveis',
    'Eletrodomésticos',
    'Utensílios Domésticos',
    'Produtos para Bebê',
    'Produtos para Idosos',
    'Ração para Animais',
    'Equipamentos de Saúde',
    'Outros'
] as const;

export const schema_createProduct = z.object({
    name:
        z.string({ error: "Campo inválido ou vazio" })
            .min(1, "Nome do produto é obrigatório")
            .min(3, "Nome deve ter pelo menos 3 caracteres"),
    description:
        z.string({ error: "Campo inválido ou vazio" })
            .min(3, "Descrição deve ter pelo menos 3 caracteres")
            .optional(),
    category:
        z.string({ error: "Campo inválido ou vazio" })
            .min(1, "Categoria é obrigatória")
            .refine((val) => CATEGORIES_OPTIONS.includes(val as any), {
                message: "Por favor, selecione uma categoria válida",
            }),
})

export const schema_updateProduct = schema_createProduct.partial();

export const schema_ngoProduct = z.object({
    name: z.string().min(1, "Selecione um produto"),
    quantity: z.coerce.number().min(1, 'Quantidade mínima é 1'),
    notes: z.string().optional()
});

export const schema_updateNgoProduct = schema_ngoProduct.partial();

export const schema_supplierProduct = z.object({
    name: z.string().min(1, "Selecione um produto"),
    price: z.coerce.number().min(0.01, 'Preço deve ser maior que zero'),
    availableQuantity: z.coerce.number().int().min(0, 'Quantidade não pode ser negativa'),
    avgDeliveryTimeDays: z.coerce.number().int().min(0, 'Tempo de entrega inválido')
});

export const schema_updateSupplierProduct = schema_supplierProduct.partial();
