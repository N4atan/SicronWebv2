import { z } from 'zod';

export const schema_supplier = z.object({
    companyName: z.string().min(1, "Razão Social é obrigatória").min(3, 'Razão Social deve ter pelo menos 3 caracteres'),
    tradeName: z.string().min(1, "Nome Fantasia é obrigatório").min(3, 'Nome Fantasia deve ter pelo menos 3 caracteres'),
    cnpj: z.string().min(1, "CNPJ é obrigatório").min(14, 'Utilize pelo menos 14 números').regex(/^\d+$/, "Utilize apenas números"),
    contactEmail: z.string().min(1, "E-mail é obrigatório").email('E-mail inválido'),
    phone: z.string().min(1, "Telefone é obrigatório").min(14, "Utilize o formato (00) 00000-0000"),
    address: z.string().min(1, "Endereço é obrigatório").min(3, 'Endereço deve ter pelo menos 3 caracteres'),
    city: z.string().min(1, "Cidade é obrigatória").min(3, 'Cidade deve ter pelo menos 3 caracteres'),
    state: z.string().min(1, "Estado é obrigatório").min(2, 'Estado deve ter pelo menos 2 caracteres'),
    postalCode: z.string().min(1, "CEP é obrigatório").min(8, 'Utilize pelo menos 8 números').regex(/^\d+$/, "Utilize apenas números"),
    stateRegistration: z.string().min(1, "Inscrição Estadual é obrigatória").min(2, 'Inscrição Estadual deve ter pelo menos 2 caracteres'),
    municipalRegistration: z.string().min(1, "Inscrição Municipal é obrigatória").min(2, 'Inscrição Municipal deve ter pelo menos 2 caracteres'),
})

export const schema_updateSupplier = schema_supplier.partial();
