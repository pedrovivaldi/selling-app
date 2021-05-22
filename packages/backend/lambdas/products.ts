import { APIGatewayProxyHandler } from 'aws-lambda';
import { CreateProductError } from '../shared/errors/products';
import { ProductsService } from '../shared/services/impl/products.service';

const productsService = new ProductsService(process.env['TABLE_NAME']);

export const getProducts: APIGatewayProxyHandler = async (event, _context) => {
    const products = await productsService.getAll();

    return {
        statusCode: 200,
        body: JSON.stringify(products),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};

export const create: APIGatewayProxyHandler = async (event, _context) => {
    if (!event.body) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Body is missing!' }),
        };
    }

    const body = JSON.parse(event.body);

    const newProduct = {
        id: body.id,
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
    };

    try {
        const productCreated = await productsService.create(newProduct);
        return {
            statusCode: 200,
            body: JSON.stringify(productCreated),
        };
    } catch (error) {
        console.log(`Error occured when creating product. Error: ${error}`);

        if (error instanceof CreateProductError) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

export const productsFunctions = {
    'create-product': {
        handler: './lambdas/products.create',
        package: {
            patterns: ['./lambdas/**', './shared/**'],
        },
        events: [
            {
                http: {
                    method: 'post',
                    path: 'admin/products',
                    // In the future, we could use an authorizer
                    private: true,
                },
            },
        ],
    },
    'get-products': {
        handler: './lambdas/products.getProducts',
        package: {
            patterns: ['./lambdas/**', './shared/**'],
        },
        events: [
            {
                http: {
                    method: 'get',
                    path: 'products',
                },
            },
        ],
    },
};
