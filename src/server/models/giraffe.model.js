const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiraffeSchema = new Schema({
    name: {
        type: String
    },
    weight: {
        type: Number
    },
    sex: {
        type: String
    },
    height: {
        type: Number
    },
    color: {
        type: String
    },
    diet: {
        type: String
    },
    temper: {
        type: String
    },
    image: {
        type: String
    },
});

const Giraffe = mongoose.model('giraffe', GiraffeSchema);

module.exports = Giraffe;