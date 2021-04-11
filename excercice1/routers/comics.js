const express = require('express')
const _ = require('lodash')
const Joi = require('joi')
const router = express.Router();
var comics = [
    {id :1, title : "spider man", author :"Steve Ditko" , image:"https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png"},
    {id :2, title : "batman", author : "Bob Kane",image:"https://cdn1-www.superherohype.com/assets/uploads/2013/11/batmane3-1.jpg"},
    {id :3, title : "Nimona", author : "Noelle Stevenson",image:"https://images-na.ssl-images-amazon.com/images/I/51boHj8x7vL._SX336_BO1,204,203,200_.jpg"},
    {id :4, title : "Watchmen", author :"Alan Moore" , image:"https://images-na.ssl-images-amazon.com/images/I/719TAGpSHQL.jpg"},
    {id :5, title : "Maus: A Survivors Tale", author : "Art Spiegelman",image:"https://upload.wikimedia.org/wikipedia/en/7/7d/Maus_%28volume_1%29_cover.jpg"},
    {id :6, title : "Daytripper", author : "Fabio Moon", image:"https://images-na.ssl-images-amazon.com/images/I/513ZKukFhRL._SX324_BO1,204,203,200_.jpg"}
]

var comics_schema = Joi.object({
    title : Joi.string().min(3).max(20).required(),
    author : Joi.string().min(3).max(20).required(),
    image: Joi.string().min(10)
});

var comics_update_schema = Joi.object({
    title : Joi.string().min(3).max(20),
    author : Joi.string().min(3).max(20),
    image: Joi.string().min(10)
});

router.get('', (req,res)=>{
    res.send(comics);
})

router.get('/:id', (req,res)=>{
    let comic = comics
.find(s => s.id === parseInt(req.params.id));
    if(!comic)
        return res.status(404).send("Comic with the given Id is not found")
    res.send(comic)
})

router.post('', (req,res)=>{
    console.log(req.body);
    let validation_result = comics_schema.validate(req.body)
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message)
    let comic = _.pick(req.body, ['title','author','image']);
    console.log('Comic', comic);
    comic.id = comics.length + 1;
    console.log("COMIC AFTER POST", comic);
    comics.push(comic)
    res.send(comic);
})
    
router.put('/:id',  (req,res) => {
    
    let comic = comics.find(s => s.id === parseInt(req.params.id));
    if(!comic)
        return res.status(404).send("comic with the given Id is not found.")
    let validation_result = comics_update_schema.validate(req.body)
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message)
    comic = _.merge(comic,req.body);
    res.send(comic)
});

router.delete('/:id',  (req,res) => {
    let comic = comics.find(s => s.id === parseInt(req.params.id));
    if(!comic)
        return res.status(404).send("Comic with the given Id is not found.")
    comics = comics.filter(s => s.id !== parseInt(req.params.id));
    res.send(comic)
});

module.exports = router