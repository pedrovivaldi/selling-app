import AWS from 'aws-sdk';
import { IProductsService, Product } from '../products.interface';
import { uuid } from 'uuidv4';
import { CreateProductError } from '../../errors/products';

export class ProductsService implements IProductsService {
    private client: any;
    private tableName: string;

    constructor(tableName: string = 'products') {
        this.client = new AWS.DynamoDB.DocumentClient();
        this.tableName = tableName;
    }

    async getAll(): Promise<Product[]> {
        console.log(`Getting all products`);

        const queryResult = await this.client
            .scan({
                TableName: this.tableName,
            })
            .promise();

        console.log(`Got products: ${JSON.stringify(queryResult.Items)}`);

        return queryResult.Items;
    }

    _validateProduct(product: Product) {
        if (!product) {
            return ['Missing product object!'];
        }

        const errors = [];
        const mandatoryAttributes: (
            | 'name'
            | 'description'
            | 'price'
            | 'imageUrl'
        )[] = ['name', 'description', 'price', 'imageUrl'];

        for (let attribute of mandatoryAttributes) {
            if (!product[attribute]) {
                errors.push(`Missing attribute ${attribute}`);
            }
        }

        return errors;
    }

    async create(product: Product): Promise<void> {
        const newProduct = Object.assign(product);

        const errors = this._validateProduct(product);

        if (errors.length > 0) {
            throw new CreateProductError(
                `Failed to create product. Error: ${errors.join('. ')}`
            );
        }

        if (!newProduct.id) {
            newProduct.id = uuid();
        }

        console.log(`Creating product ${JSON.stringify(product)}`);

        await this.client
            .put({
                TableName: this.tableName,
                Item: newProduct,
            })
            .promise();

        console.log(`Product created!`);

        return newProduct;
    }
}
