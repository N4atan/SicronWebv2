import { z } from 'zod';

const AREAS_OPTIONS = [
    'Assistência Social',
    'Cultura',
    'Saúde',
    'Meio Ambiente',
    'Educação e Pesquisa',
    'Habitação',
    'Desenvolvimento e Defesa de Direitos',
    'Direitos Humanos',
    'Combate à Fome',
    'Segurança Alimentar',
    'Geração de Renda',
    'Emprego e Capacitação Profissional',
    'Inclusão Social',
    'Apoio a Crianças e Adolescentes',
    'Apoio a Idosos',
    'Apoio a Pessoas com Deficiência',
    'Proteção Animal',
    'Esporte e Lazer',
    'Tecnologia e Inovação Social',
    'Cidadania',
  'Outros'
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