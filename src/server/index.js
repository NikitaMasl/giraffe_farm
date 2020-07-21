const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');

// const https = require('https');
// const fs = require('fs');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8080;
const path = require('path');

app.use(compression());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/light-tech-test-db', { 
    useNewUrlParser: true,
    useFindAndModify: false, 
    useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to the MongoDB!")
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next()
})
app.use('/images', express.static(path.join(__dirname, '../../dist/image')));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

require('./routes')(app);
require('./routes/static')(app);

// const giraffes = require('./routes/index');
// app.use('/giraffes', giraffes);


if (process.env.NODE_ENV == 'production') {
    app.use('/', express.static(path.join(__dirname, '../client')));
    app.listen(PORT, () => {
        console.log(`Listening port: ${PORT}`);
    })
} else if (process.env.NODE_ENV == 'development') {
    const webpack = require('webpack');
    const config = require(path.join(__dirname, '../../webpack.config'));
    const compiler = webpack(config);

    app
        .use(require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath,
            stats: 'errors-only'
        }));
    app.use(require('webpack-hot-middleware')(compiler));

    // const options = {
    //     key: fs.readFileSync(__dirname + '/ssl/key.pem'),
    //     cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
    //     requestCert: false,
    //     rejectUnauthorized: false
    // };
    // const server = https.createServer(options, app);


    app.listen(PORT, () => {
        console.log(`Server listening port: ${PORT}`);
    })
}
module.exports = app


