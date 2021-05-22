import { Serverless } from 'serverless/aws';
import { counterFunctions } from './lambdas/counter';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'backend',
    },
    frameworkVersion: '1',
    custom: {
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
        },
    },
    functions: {
        ...counterFunctions,
    },
};

module.exports = serverlessConfiguration;
