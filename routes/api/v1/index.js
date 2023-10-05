const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('models/Quote');
const Quote = mongoose.model('quotes');

router.get('/', (req,res) =>{
    res.send('Hi')
});

//Allow user to retrievve all document
router.get('/quotes', async(req, res) =>{
    const filter = {};
    const quotes = await Quote.find(filter);
    console.log(quotes);
    res.json(quotes);
});

//Allow user to retrieve all qoutes for a single character
router.get('/quotes/character/:character', async(req, res) =>{
    character = req.params.character;
    // const filter = {"character": character};
    // const quotes = await Quote.find(filter);
    // console.log(quotes);
    // res.json(quotes);

    const regExpression = new RegExp(character, 'i');
    const regexfilter = {"character": {$regex: regExpression}};
    const quotes = await Quote.find(regexfilter);
    console.log(quotes);
    res.json(quotes);
});

router.get('/characters' , async(req, res) =>{
    const characters=  await Quote.distinct('character');
    res.json(characters)
});


module.exports = router;