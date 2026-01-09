import { z } from 'zod';

const AREAS_OPTIONS = [
    'Assistência Social', 'Cultura', 'Saúde', 'Meio Ambiente', 
    'Desenvolvimento e Defesa de Direitos', 'Habitação', 
    'Educação e Pesquisa', 'Outros'
] as const;

export const schema_ngo = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    trade_name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    cnpj: z.string().min(14, "Utilize apenas números"),
    area: z.string().refine((val) => AREAS_OPTIONS.includes(val as any), {
        message: "Por favor, selecione uma área válida",
    }),
    description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
    local: z.string().min(3, "Utilize o formato Cidade-Estado"),
    phone_number: z.string().min(14, "Utilize o formato (00) 00000-0000"),
    contact_email: z.string().email("E-mail inválido"),
})


export const schema_updateNgo = schema_ngo.partial();