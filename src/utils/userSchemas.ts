import { z } from 'zod';

export const ROLE_OPTIONS = [
    'admin',
    'user',
] as const;


export const schema_baseUser = z.object({
    email:
        z.string()
            .trim()
            .min(1, "E-mail é obrigatório")
            .email("E-mail inválido"),
})

export const schema_createUser = schema_baseUser.extend({
    username:
        z.string()
            .trim()
            .min(1, "Nome de usuário é obrigatório")
            .min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
    password:
        z.string()
            .min(1, "Senha é obrigatória")
            .min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const schema_updateUser = schema_baseUser.extend({
    username:
        z.string()
            .trim()
            .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
            .optional(),
    password:
        z.string()
            .min(6, "Senha deve ter pelo menos 6 caracteres")
            .optional(),
    role:
        z.string()
            .refine((val) => ROLE_OPTIONS.includes(val as any), {
                message: "Por favor, selecione um tipo de usuário válido",
            }).optional(),
})

export const schema_loginUser = schema_baseUser.extend({
    password:
        z.string()
            .min(1, "Senha é obrigatória")
            .min(6, "Senha deve ter pelo menos 6 caracteres"),
})
