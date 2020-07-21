const multer = require('multer')
const path = require('path')
const router = require('express').Router();

let Geraffe = require('../models/giraffe.model');
const Giraffe = require('../models/giraffe.model');

const GiraffeController =require('../controllers/giraffe');

const storage = multer.diskStorage({
    destination: './uploads/' /* relative to root dir of project */,
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = (app) => {
    // Upload image
    app.post('/uploadImage', upload.single('file'), async (req, res) => {
        if (req.file) {
            res.send({ success: true })
        } else {
            res.sendStatus(500)
        }
    })

    // Giraffe API
    app.delete('/api/deleteAll', GiraffeController.giraffe_del_all)
    
    app.route('/api/giraffe') 
        .post(GiraffeController.post_req)

    app.route('/api/giraffes')
        .get(GiraffeController.get_all_giraffes)
    
    app.route('/api/giraffe/:id')
        .get(GiraffeController.giraffe_get_req)
        .put(GiraffeController.giraffe_put_req)
        .delete(GiraffeController.giraffe_del_req)
}