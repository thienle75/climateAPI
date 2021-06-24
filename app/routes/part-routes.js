const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const climateService = require('../service/climateService.js');
const apiKeyService = require('../services/apiKeyService.js')

module.exports = function(app, db) {

    // -- setup up swagger-jsdoc --
    const swaggerDefinition = {
        info: {
            title: 'Weather API',
            version: '1.0.1',
            description: 'Simple Express based NodeJS API that mocks an weather backend.',
        },
        host: 'localhost:9001',
        basePath: '/',
    };

    const options = {
        swaggerDefinition,
        apis: [path.resolve('app/routes/part-routes.js')],
    };

    const swaggerSpec = swaggerJSDoc(options);

    // -- routes for docs and generated swagger spec --
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.get('/docs', (req, res) => {
        res.sendFile(path.resolve('docs/redoc.html'));
    });


    app.get('/weather', (req, res) => {
        if (apiKeyService.validateAPIKey(req.query.apikey)){
            var list = climateService.getAllUrbanMeanByDate(req.query.date)
            if (list){
                res.send(list)
            }
        }
        res.statusCode = 401;
    });

};
