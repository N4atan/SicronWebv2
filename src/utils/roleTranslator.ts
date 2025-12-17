export const roleTranslator: Record<string, string> = {
    'admin': 'Administrador',
    'user': 'Usuário',
    'ngoOwner': 'Dono de ONG',
    'ngoManager': 'Gerente de ONG',
    'ngoEmployer': 'Funcionário de ONG',
    'supplierOwner': 'Dono de Fornecedor',
    'supplierManager': 'Gerente de Fornecedor',
    'supplierEmployer': 'Funcionário de Fornecedor',
};

export function translateRole(role: string | undefined): string {
    if (!role) return 'Desconhecido';
    return roleTranslator[role] || role;
}
