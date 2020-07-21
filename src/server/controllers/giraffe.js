const Giraffe = require('../models/giraffe.model');

module.exports = {
    get_all_giraffes: async (req, res) => {
        Giraffe.find()
            .then(giraffes => res.jsonp(giraffes))
            .catch(err => res.status(400).jsonp(`Error: ${err}`));
    }, 

    post_req: async (req, res) => {
        const name = req.body.name;
        const weight = req.body.weight;
        const sex = req.body.sex;
        const height = req.body.height;
        const color = req.body.color;
        const diet = req.body.diet;
        const temper = req.body.temper;
        const image = req.body.image;

        const newGiraffe = new Giraffe({
            name,
            weight,
            sex,
            height,
            color,
            diet,
            temper,
            image,
        })

        newGiraffe.save()
            .then(() => res.jsonp(newGiraffe))
            .catch(err => {
                res.status(400).jsonp(`Error: ${err}`)
            });
    },

    giraffe_get_req: async (req, res) => {
        Giraffe.findById(req.params.id)
            .then(giraffe => res.jsonp(giraffe))
            .catch(err => res.status(400).json(`Error: ${err}`));
    },
    
    giraffe_put_req: async (req, res) => {
        Giraffe.findById(req.params.id)
            .then(giraffe => {
                for (key in req.body){
                    giraffe[key] = req.body[key]
                }

                giraffe.save()
                    .then(() => res.jsonp(giraffe))
                    .catch(err => res.status(400).jsonp(`Error: ${err}`));
            })
            .catch(err => res.status(400).jsonp(`Error: ${err}`));
    },

    giraffe_del_req: async (req, res) => {
        Giraffe.findByIdAndDelete(req.params.id)
            .then(() => res.jsonp('Giraffe deleted!'))
            .catch(err => {
                res.status(400).jsonp(`Error: ${err}`)
            }); 
    },

    giraffe_del_all: async (req, res) => {
        Giraffe.deleteMany()
            .then(() => res.jsonp('All models was deleted!'))
            .catch(err => res.jsonp(`Errror: ${err}`));
    }
}