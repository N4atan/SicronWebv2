export const ENTITY_SCHEMAS = {
    user: [
        { name: 'username', label: 'Nome de Usuário', type: 'text', placeholder: 'Seu Nome Completo' },
        { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
        { name: 'password', label: 'Senha', type: 'password', placeholder: '******' },
        {
            name: 'role',
            label: 'Função',
            type: 'text',
            variant: 'selection',
            options: ['user', 'admin', 'ngoManager', 'supplierManager', 'ngoEmployer', 'supplierEmployer'],
            placeholder: 'Selecione uma função'
        }
    ],
    user_profile: [
        { name: 'username', label: 'Nome de Usuário', type: 'text', placeholder: 'Seu Nome' },
        { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
        { name: 'password', label: 'Nova Senha', type: 'password', placeholder: 'Preencha apenas se quiser alterar' }
    ],
    ong: [
        { name: 'name', label: 'Razão Social', type: 'text', placeholder: 'Razão Social Ltda' },
        { name: 'trade_name', label: 'Nome Fantasia', type: 'text', placeholder: 'ONG do Amor' },
        { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0001-00' },
        {
            name: 'area', // Backend espera 'area', não 'foco_principal'
            label: 'Área de Atuação',
            type: 'text',
            variant: 'selection',
            options: ['Selecione uma área...', 'Assistência Social', 'Cultura', 'Saúde', 'Meio Ambiente', 'Desenvolvimento e Defesa de Direitos', 'Habitação', 'Educação e Pesquisa', 'Outros'],
            placeholder: 'Selecione a área'
        },
        { name: 'description', label: 'Descrição / Objetivo', type: 'text', variant: 'text-area', placeholder: 'Descreva a missão...' },
        { name: 'local', label: 'Localização', type: 'text', placeholder: 'Cidade - UF' },
        { name: 'phone_number', label: 'Telefone', type: 'text', placeholder: '(00) 0000-0000' },
        { name: 'contact_email', label: 'E-mail para Contato Público', type: 'email', placeholder: 'contato@ong.org' }
        // Remova o gestor_email, pois o backend vincula automaticamente pelo seu Token de Login!
    ],
    supplier: [
        { name: 'companyName', label: 'Razão Social', type: 'text', placeholder: 'Empresa Ltda' },
        { name: 'tradeName', label: 'Nome Fantasia', type: 'text', placeholder: 'Minha Empresa' },
        { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0001-00' },
        { name: 'contactEmail', label: 'E-mail Comercial', type: 'email', placeholder: 'contato@empresa.com' },
        { name: 'phone', label: 'Telefone', type: 'text', placeholder: '(00) 0000-0000' },
        { name: 'address', label: 'Endereço', type: 'text', placeholder: 'Rua das Flores, 123' },
        { name: 'city', label: 'Cidade', type: 'text', placeholder: 'São Paulo' },
        { name: 'state', label: 'Estado', type: 'text', placeholder: 'SP' },
        { name: 'postalCode', label: 'CEP', type: 'text', placeholder: '00000-000' },
        { name: 'stateRegistration', label: 'Inscrição Estadual', type: 'text', placeholder: 'Isento ou número' },
        { name: 'municipalRegistration', label: 'Inscrição Municipal', type: 'text', placeholder: 'Isento ou número' }
    ],
    product: [
        { name: 'name', label: 'Nome do Produto', type: 'text', placeholder: 'Ex: Arroz 5kg' },
        { name: 'description', label: 'Descrição', type: 'text', placeholder: 'Detalhes do produto' },
        { name: 'expiration_date', label: 'Validade (Dias)', type: 'number', placeholder: 'Dias' }
    ]
};
