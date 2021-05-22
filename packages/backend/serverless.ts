import { Serverless } from 'serverless/aws';
import { counterFunctions } from './lambdas/counter';
import { productsFunctions } from './lambdas/products';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'backend',
    },
    frameworkVersion: '1',
    custom: {
        dynamodb: {
            development: {
                tableName: 'dev_products',
                arn:
                    'arn:aws:dynamodb:us-east-1:002494347922:table/dev_products',
            },
            production: {
                tableName: 'products',
                arn: 'arn:aws:dynamodb:us-east-1:002494347922:table/products',
            },
        },
        'serverless-offline': {
            httpPort: 3010,
            lambdaPort: 3012,
            apiKey: 'local',
        },
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack', 'serverless-offline'],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        region: 'us-east-1',
        apiKeys: ["${opt:stage, 'development'}-backend-key"],
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            STAGE: "${opt:stage, 'development'}",
            TABLE_NAME:
                "${self:custom.dynamodb.${opt:stage, 'development'}.tableName}",
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: ['dynamodb:PutItem', 'dynamodb:Scan'],
                Resource:
                    "${self:custom.dynamodb.${opt:stage, 'development'}.arn}",
            },
        ],
    },
    functions: {
        ...counterFunctions,
        ...productsFunctions,
    },
};

module.exports = serverlessConfiguration;
