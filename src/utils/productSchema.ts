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
