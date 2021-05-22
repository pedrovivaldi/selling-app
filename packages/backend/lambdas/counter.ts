import { APIGatewayProxyHandler } from 'aws-lambda';
import { CounterService } from '../shared/services/impl/counter.service';

const counterService = new CounterService();

function validateParameters(
    namespace: string | undefined,
    key: string | undefined
): string[] {
    const errors = [];

    if (!namespace) {
        errors.push('Path parameter namespace is missing');
    }

    if (!key) {
        errors.push('Path parameter key is missing');
    }

    return errors;
}

export const getCounter: APIGatewayProxyHandler = async (event, _context) => {
    const namespace = event.pathParameters?.namespace;
    const key = event.pathParameters?.key;

    const errors = validateParameters(namespace, key);

    if (errors.length > 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ errors }),
        };
    }

    const { value } = await counterService.get(namespace!!, key!!);

    if (!value) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: `Error when getting count for namespace ${namespace} and key ${key}`,
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ value }, null, 2),
    };
};

export const count: APIGatewayProxyHandler = async (event, _context) => {
    const namespace = event.pathParameters?.namespace;
    const key = event.pathParameters?.key;

    const errors = validateParameters(namespace, key);

    if (errors.length > 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ errors }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }

    const { value } = await counterService.count(namespace!!, key!!);

    if (!value) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Error when counting for namespace ${namespace} and key ${key}`,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ value }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};

export const counterFunctions = {
    'get-counter': {
        handler: './lambdas/counter.getCounter',
        package: {
            patterns: ['./lambdas/**', './shared/**'],
        },
        events: [
            {
                http: {
                    method: 'get',
                    path: 'admin/get-count/{namespace}/{key}',
                    // In the future, we could use an authorizer
                    private: true,
                    request: {
                        parameters: {
                            paths: {
                                namespace: true,
                                key: true,
                            },
                        },
                    },
                },
            },
        ],
    },
    counter: {
        handler: './lambdas/counter.count',
        package: {
            patterns: ['./lambdas/**', './shared/**'],
        },
        events: [
            {
                http: {
                    method: 'post',
                    path: 'count/{namespace}/{key}',
                    request: {
                        parameters: {
                            paths: {
                                namespace: true,
                                key: true,
                            },
                        },
                    },
                },
            },
        ],
    },
};
