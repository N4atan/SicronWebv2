export const HEADER_MAP: Record<string, string> = {
    // === GERAL ===
    id: 'ID',
    uuid: 'UUID',
    name: 'Razão Social',
    description: 'Descrição',
    created_at: 'Criado em',
    status: 'Status',
    notes: 'Observações',

    // === USUÁRIOS ===
    username: 'Usuário',
    email: 'E-mail',
    role: 'Perfil',

    // === NGOS (ONGs) ===
    trade_name: 'Nome Fantasia',
    cnpj: 'CNPJ',
    area: 'Área de Atuação',
    wallet: 'Carteira (Saldo)',
    local: 'Localização',
    phone_number: 'Telefone',
    contact_email: 'E-mail de Contato',

    // === FORNECEDORES (SUPPLIERS) ===
    companyName: 'Razão Social',
    tradeName: 'Nome Fantasia',
    contactEmail: 'E-mail de Contato',
    phone: 'Telefone',
    address: 'Endereço',
    city: 'Cidade',
    state: 'Estado',
    postalCode: 'CEP',
    stateRegistration: 'Inscrição Estadual',
    municipalRegistration: 'Inscrição Municipal',

    // === PRODUTOS & OFERTAS ===
    category: 'Categoria',
    price: 'Preço (R$)',
    availableQuantity: 'Qtd. Disponível',
    quantity: 'Quantidade',
    avgDeliveryTimeDays: 'Tempo de Entrega (Dias)',
    product: 'Produto',
    supplier: 'Fornecedor',
    ngo: 'ONG',
    supplierProducts: 'Fornecedores Vinculados',
};
