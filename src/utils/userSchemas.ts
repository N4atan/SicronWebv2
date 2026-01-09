import { z } from 'zod';

export const schema_baseUser = z.object({
    email: z.string().email("E-mail inválido"),
})

export const schema_createUser = schema_baseUser.extend({
    username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const schema_updateUser = schema_baseUser.extend({
    username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres").optional(),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
})

export const schema_loginUser = schema_baseUser.extend({
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})
