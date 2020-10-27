const express = require('express');
const router = express.Router();
const db = require('../models')


// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
    .then(faveData=>{
      res.render('favorites',{favePoke: faveData})
    })
    .catch(err=>{
      console.log(err)
    })
  //res.send('Render a page of favorites here');
});





// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  let addFave = req.body.name
  db.pokemon
    .findOrCreate({
      where: {name: addFave}
    })
    .then(([createdFave,wasCreated])=>{
      console.log('created: ',createdFave)
      res.redirect('/')
    })
    .catch(err=>{
      console.log('Error: ', err)
    })
});

module.exports = router;
