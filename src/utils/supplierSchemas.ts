import { z } from 'zod';

export const schema_supplier = z.object({
    companyName:
        z.string()
            .trim()
            .min(1, "Razão Social é obrigatória")
            .min(3, 'Razão Social deve ter pelo menos 3 caracteres')
            .max(255, "Máximo de 255 caracteres"),
    tradeName:
        z.string()
            .trim()
            .min(1, "Nome Fantasia é obrigatório")
            .min(3, 'Nome Fantasia deve ter pelo menos 3 caracteres')
            .max(255, "Máximo de 255 caracteres"),
    cnpj:
        z.string()
            .trim()
            .min(1, "CNPJ é obrigatório")
            .min(14, 'Utilize pelo menos 14 números')
            .max(14, "CNPJ deve ter 14 caracteres") // Backend enforce length 14 check? Entity says length 14.
            .regex(/^\d+$/, "Utilize apenas números"),
    contactEmail:
        z.string()
            .trim()
            .min(1, "E-mail é obrigatório")
            .email('E-mail inválido')
            .max(255, "Máximo de 255 caracteres"),
    phone:
        z.string()
            .trim()
            .max(15, "Telefone muito longo (máx 15)")
            .optional(),
    address:
        z.string()
            .trim()
            .max(255, "Máximo de 255 caracteres")
            .optional(),
    city:
        z.string()
            .trim()
            .max(255, "Máximo de 255 caracteres")
            .optional(),
    state:
        z.string()
            .trim()
            .max(255, "Máximo de 255 caracteres")
            .optional(),
    postalCode:
        z.string()
            .trim()
            .max(20, "CEP muito longo")
            .optional(),
    stateRegistration:
        z.string()
            .trim()
            .max(255, "Máximo de 255 caracteres")
            .optional(),
    municipalRegistration:
        z.string()
            .trim()
            .max(255, "Máximo de 255 caracteres")
            .optional(),
})

export const schema_updateSupplier = schema_supplier.partial();
