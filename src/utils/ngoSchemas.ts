import { z } from 'zod';

export const AREAS_OPTIONS = [
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
    name:
        z.string()
            .min(1, "Nome é obrigatório")
            .min(3, "O nome social deve ter pelo menos 3 caracteres"),
    trade_name:
        z.string()
            .min(1, "Nome fantasia é obrigatório")
            .min(3, "O nome fantasia deve ter pelo menos 3 caracteres"),
    cnpj:
        z.string()
            .min(1, "CNPJ é obrigatório")
            .min(14, "O CNPJ deve conter pelo menos 14 números")
            .regex(/^\d+$/, "Utilize apenas números para o CNPJ"),
    area:
        z.string()
            .min(1, "Selecione uma área")
            .refine((val) => AREAS_OPTIONS.includes(val as any), {
                message: "Por favor, selecione uma área de atuação válida",
            }),
    description:
        z.string()
            .min(1, "Descrição é obrigatória")
            .min(10, "A descrição deve ser detalhada (mínimo 10 caracteres)")
            .max(255, "A descrição deve ter no máximo 255 caracteres"),
    local:
        z.string()
            .min(1, "Localização é obrigatória")
            .min(3, "Informe a cidade e estado (ex: Curitiba - PR)"),
    phone_number:
        z.string()
            .min(1, "Telefone é obrigatório")
            .min(10, "Informe um telefone válido com DDD")
            .max(15, "Telefone muito longo"),
    contact_email:
        z.string()
            .min(1, "E-mail é obrigatório")
            .email("Insira um endereço de e-mail válido para contato"),
})


export const schema_updateNgo = schema_ngo.partial();