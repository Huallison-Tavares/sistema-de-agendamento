export interface MenuType {
    id: string;
    name: string;
    products: productsTypes[];
}

export interface productsTypes {
    id: string;
    name: string;
    description: string | null;
    categoryId: string;
    imageUrl: string | null;
    groupOfAdditional: groupOfAdditionalType[];
    additional: additionalTypes[];
}

export interface groupOfAdditionalType {
    id: string;
    name: string;
    imageUrl: string | null;
    min: number | null;
    max: number | null;
    isRequired: boolean;
    productId: string;
    additional: additionalTypes[];
}

export interface additionalTypes {
    id: string;
    name: string;
    imageUrl: string | null;
    productId: string | null;
    priceInCents: number;
    groupOfAdditionalId: string | null;
}