const express        = require('express');
const bodyParser     = require('body-parser');
const db             = require('diskdb');
const cors           = require('cors')
const app            = express();

const port = 9001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

db.connect('./app/db', ['cities', 'climate']);
require('./app/routes')(app, db);

app.listen(port, () => {
  console.log('We are live on ' + port);
  console.log('CORS enabled on all origins');
});