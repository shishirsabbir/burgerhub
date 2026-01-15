// for types

// global burger type

export type BurgerCategory = 'beef' | 'chicken' | 'fish' | 'vegetable';

export interface BurgerData {
    id?: string;
    title: string;
    slug: string;
    description: string;
    category: BurgerCategory;
    price: number;
    ingredients: string[];
    coverImage: string;
    images: string[];
    tags: string[];

    createdAt?: string;
    updatedAt?: string;
}

export interface FileState {
    file: File | null;
    preview: string;
}

// burger form input
export interface BurgerFormInput {
    title: string;
    description: string;
    category: BurgerCategory;
    price: string;
    ingredients: string[];
    tags: string[];

    coverImage: File | null;
    images: File[];
}
