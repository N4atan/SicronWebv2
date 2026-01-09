import { z } from 'zod';

export const schema_product = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
    expiration_date: z.string().min(3, "Data de expiração deve ter pelo menos 3 caracteres"),
})

export const schema_updateProduct = schema_product.partial();
