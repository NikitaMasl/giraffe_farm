
const env = process.env.NODE_ENV === 'production';

const path = require('path');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../dist/client/index.html'));
    })
}