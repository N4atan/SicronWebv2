export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'PENDING' | 'APPROVED' | 'REJECTED';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',

    NGO_OWNER = 'ngoOwner',
    NGO_MANAGER = 'ngoManager',
    NGO_EMPLOYER = 'ngoEmployer',

    SUPPLIER_OWNER = 'supplierOwner',
    SUPPLIER_MANAGER = 'supplierManager',
    SUPPLIER_EMPLOYER = 'supplierEmployer'
}

export interface Product {
    id?: number;
    uuid: string;
    name: string;
    description?: string;
    category?: string;
    supplierProducts?: SupplierProduct[];
    ngoProducts?: any[]; // Defined in Backend as NGOProduct[] but skipping deep nesting for now if unused
}

export interface SupplierProduct {
    id: number;
    supplier?: Supplier;
    product?: Product;
    price: number;
    availableQuantity: number;
    avgDeliveryTimeDays: number;
}

export interface NGOProduct {
    id: number;
    quantity: number;
    notes?: string;
    product: Product;
    ngo?: NGO;
    active: boolean;
    collected_quantity: number;
}

export interface NGO {
    id?: number;
    uuid?: string;
    name: string;
    trade_name: string;
    cnpj: string;
    area: string;
    description: string;
    local: string;
    phone_number: string;
    contact_email: string;

    wallet?: number;
    status?: ApprovalStatus | string;
    creation_date?: string; // Backend sends Date, but via JSON it is string

    manager?: User;
    manager_uuid?: string;
    employees?: User[];
    products?: NGOProduct[];
}

export interface Supplier {
    id?: number;
    uuid?: string;
    companyName: string;
    tradeName: string;
    cnpj: string;
    contactEmail: string;

    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    stateRegistration?: string;
    municipalRegistration?: string;

    status?: ApprovalStatus | string;
    manager_uuid?: string;

    manager?: User;
    employees?: User[];
    products?: SupplierProduct[];
    paymentReceipts?: any[];
}

export interface User {
    id?: number | string;
    uuid?: string;
    username: string;
    email?: string;
    password?: string;
    role?: UserRole;

    managedNGO?: NGO;
    managedSupplier?: Supplier;
    employedNGOs?: NGO[];
    employedSuppliers?: Supplier[];

    [key: string]: any;
}

export interface DonationItem {
    product_uuid: string;
    quantity: number;
}

export interface DonationPayload {
    ngo_uuid: string;
    items: DonationItem[];
    fileUrl: string;
}

// Interface visual para exibição (Page-ONG/ListaItens)
export interface ViewProduct {
    uuid: string;
    tag: string;
    name: string;
    price: number;
    description: string;
    qtd: number; // Meta da ONG
    collected?: number; // Já doado
}
