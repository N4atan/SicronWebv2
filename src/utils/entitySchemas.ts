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
            options: ['user', 'admin', 'ongManager', 'providerManager'],
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
            name: 'area',
            label: 'Área de Atuação',
            type: 'text',
            variant: 'selection',
            options: ['Assistência Social', 'Cultura', 'Saúde', 'Meio Ambiente', 'Desenvolvimento e Defesa de Direitos', 'Habitação', 'Educação e Pesquisa', 'Outros'],
            placeholder: 'Selecione a área'
        },
        { name: 'description', label: 'Descrição', type: 'text', variant: 'text-area', placeholder: 'Descreva a missão...' },
        { name: 'local', label: 'Localização', type: 'text', placeholder: 'Cidade - UF' },
        { name: 'phone_number', label: 'Telefone', type: 'text', placeholder: '(00) 0000-0000' },
        { name: 'contact_email', label: 'E-mail do Administrador', type: 'email', placeholder: 'seu@Email.com' }
    ]
};
