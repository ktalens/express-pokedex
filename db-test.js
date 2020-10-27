const db = require("./models");

db.pokemon
  .create({
    name: "Pikachu",
  })
  .then(function (poke) {
    console.log("Created: ", poke.name);
  })
  .catch(err=>{
    console.log(err)
  });

db.pokemon.findAll().then(function (poke) {
  console.log("Found: ", poke.name);
});