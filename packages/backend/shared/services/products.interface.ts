export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}

export interface IProductsService {
    getAll(): Promise<Product[]>;
    create(product: Product): Promise<void>;
    // get(id: string): Promise<Product | null>;
    // update(product: Product): Promise<Product>;
    // delete(id: string): Promise<boolean>;
}
