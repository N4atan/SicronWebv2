import { z } from 'zod';

export const schema_supplier = z.object({
    companyName: z.string().min(3, 'Razão Social deve ter pelo menos 3 caracteres' ),
    tradeName: z.string().min(3, 'Nome Fantasia deve ter pelo menos 3 caracteres' ),
    cnpj: z.string().min(14, 'Utilize apenas números' ),
    contactEmail: z.string().email('E-mail inválido' ),
    phone: z.string().min(14, "Utilize o formato (00) 00000-0000"),
    address: z.string().min(3, 'Endereço deve ter pelo menos 3 caracteres' ),
    city: z.string().min(3, 'Cidade deve ter pelo menos 3 caracteres' ),
    state: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres' ),
    postalCode: z.string().min(8, 'Utilize apenas números' ),
    stateRegistration: z.string().min(2, 'Inscrição Estadual deve ter pelo menos 2 caracteres' ),
    municipalRegistration: z.string().min(2, 'Inscrição Municipal deve ter pelo menos 2 caracteres' ),
})

export const schema_updateSupplier = schema_supplier.partial();
