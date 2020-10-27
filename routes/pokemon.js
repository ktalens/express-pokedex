const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios');
const methodOverride= require('method-override') //nmp i method-override

router.use(methodOverride('_method')) // looks at any request object coming in, and if there's a querystring, it looks to..... 

router.use(express.urlencoded({ extended: false }));


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
      where: {
        name: addFave}
    })
    .then(([createdFave,wasCreated])=>{
      console.log('created: ',createdFave)
      res.redirect('/')
      
    })
    .catch(err=>{
      console.log('Error: ', err)
    })
});

router.get('/:idx',(req,res)=>{
  let pokemonUrl =`http://pokeapi.co/api/v2/pokemon/${(req.params.idx).toLowerCase()}`

  axios.get(pokemonUrl)
    .then(response=>{
      let monsterData=response.data 
      res.render('show',{pokeData: monsterData})
      //res.send(monsterData)
    })
  .catch(err=>{
    console.log(err)//res.render('show')
  })
})

router.delete('/:idx',(req,res)=>{
  let unFavorite = req.body.name
  //res.send(unFavorite)
  db.pokemon.destroy({
    where: {name: unFavorite}
  })
  .then(numRowsDeleted=>{
    console.log(numRowsDeleted)
    res.redirect('/pokemon')
  })
  .catch(err=>{
    console.log(err)
  })
  
})

module.exports = router;
