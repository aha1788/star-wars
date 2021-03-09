const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;

//Allow cross-orgin
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use("/api-people/:id", async (req, res) => {
  let ob = await get_Info(req.params.id);
  res.json({ data: ob });
});

let get_Info = async function (id) {
  var person;
  var homeworld;
  var species;
  var films = [];
  var result;

  //fetching data from Star-Wars api and catching errors
  await axios
    .get("https://swapi.dev/api/people/" + id)
    .then((res) => {
      person = res.data;
      //console.log(person);
    })
    .catch((e) => {
      //  console.error(e);
      result = "Error_catched";
    });

  //check if there is a person with that id
  if (result !== "Error_catched") {
    let promises = []; //an array to save all fetches that will be performed in parallel.
    let hw = 0; //a variable to check if there is homeworld matching that id.
    let f = 0; //a variable to check if there are films matching that id.
    let s = 0; //a variable to check if there is species matching that id.

    //push homeworld URL to the array
    if (person.homeworld !== null && person.homeworld !== "") {
      promises.push(axios.get(person.homeworld));
      hw = 1;
    }

    //push films URLs to the array
    if (person.films.length !== 0) {
      for (let i = 0; i < person.films.length; i++) {
        promises.push(axios.get(person.films[i]));
      }
      f = person.films.length;
    }

    //push species URL to the array
    if (person.species.length !== 0) {
      promises.push(axios.get(person.species[0]));
      s = 1;
    }

    // fetch all promises together
    await axios.all(promises).then(
      axios.spread((...args) => {
        //   console.log(args[0].data);
        if (hw != 0) {
          //if hw=1 the first args from fetching will be the data of homeWorld
          homeworld = {
            title: args[0].data.name,
            terrain: args[0].data.terrain,
            population: args[0].data.population,
          };
          if (f != 0) {
            //if hw=1 & f!=0 the second data from fetching will be the data of films
            for (let i = 1; i <= f; i++) {
              films.push({
                title: args[i].data.title,
                director: args[i].data.director,
                producer: args[i].data.producer,
                release_date: args[i].data.release_date,
              });
            }
            if (s !== 0) {
              species = {
                //if hw=1 & f!=0 & s!=0 the last args will be the species
                name: args[f + 1].data.name,
                average_lifespan: args[f + 1].data.average_lifespan,
                classification: args[f + 1].data.classification,
                language: args[f + 1].data.language,
              };
            } else {
              species = "n/a";
            }
          } else {
            if (person.species.length !== 0) {
              //if hw=1 & f=0 the second data from fetching will be the data of species
              species = {
                name: args[1].data.name,
                average_lifespan: args[1].data.average_lifespan,
                classification: args[1].data.classification,
                language: args[1].data.language,
              };
            } else {
              species = "n/a";
            }
          }
        } else {
          homeworld = "n/a"; //if hw=0 the first args from fetching will not be the data of homeWorld
          if (f != 0) {
            //if hw=0 & f!=0 the first data from fetching will be the data of films
            for (let i = 0; i < f; i++) {
              films.push({
                title: args[i].data.title,
                director: args[i].data.director,
                producer: args[i].data.producer,
                release_date: args[i].data.release_date,
              });
            }
            if (person.species.length !== 0) {
              //if hw=0 & f!=0 & s!=0 the last args will be the species
              species = {
                name: args[f].data.name,
                average_lifespan: args[f].data.average_lifespan,
                classification: args[f].data.classification,
                language: args[f].data.language,
              };
            } else {
              species = "n/a";
            }
          } else {
            if (person.species.length !== 0) {
              //if hw=0 & f=0 & s!=0 the first data from fetching will be the data of species
              species = {
                name: args[0].data.name,
                average_lifespan: args[0].data.average_lifespan,
                classification: args[0].data.classification,
                language: args[0].data.language,
              };
            } else {
              species = "n/a";
            }
          }
        }

        //}
      })
    );

    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      hair_color: person.hair_color,
      skin_color: person.skin_color,
      gender: person.gender,
      birth_year: person.birth_year,
      homeworld,
      species,
      films,
    };
  } else {
    return "Error has been catched: (id not used)";
  }
};
