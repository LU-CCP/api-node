const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'LU API',
            description: 'API Creada por LU',
            servers: ['http://localhost:3005'],
        },
    },
    apis: [`${process.cwd()}/src/routes/*.js`]
}

exports.config = swaggerOptions;