const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const climateService = require('../services/climateService.js');
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
/**
     * @swagger
     * /parts?apikey={apikey}date={date}:
     *   get:
     *     summary: Get parts
     *     parameters:
     *      - in: query
     *        name: date
     *        schema:
     *          type: string
     *     responses:
     *       200:
     *         description: Returns a list of active parts that match the search terms.
     *         schema:
     *           type: object
     *           list: 
     *              type: array
     *              properties:
     *                  urbanName: 
     *                      type: string
     *                  climateIdentifier:
     *                      type: string
     *                  dist:
     *                      type: float
     *                  mean:
     *                      type: string 
     *           median:
     *              type:float          
     */

    app.get('/weather', (req, res) => {
        console.log(req.query)
        if (apiKeyService.validateAPIKey(req.query.apikey)){
            var list = climateService.getAllUrbanMeanByDate(req.query.date)
            var median = climateService.findMedian(list)
            if (list){
                res.statusCode = 200;
                res.send({list, median})
            }
        }
        res.statusCode = 401;
        return res.send('Not Authorized');
    });

};
