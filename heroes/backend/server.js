
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const route = require('../route')


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', route)
app.use(require('./routes/index.routes'))

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});