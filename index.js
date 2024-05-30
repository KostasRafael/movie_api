const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost/cfDB');

const express = require("express");

const morgan = require('morgan');

const bodyParser = require('body-parser');

const uuid = require('uuid');

const app = express();

app.use(morgan("common"));

app.use(bodyParser.json());


app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get("/movies/:title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title})
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.get("/movies/genre/:genreName", (req, res) => {
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;
    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("genre not found")
    }
})

app.get("/movies/directors/:directorName", (req, res) => {
    const {directorName} = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;
    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send("genre not found")
    }
})

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser);
  } else {
      res.status(400).send('users must have a name')
  }
})


app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    let user = users.find(user => user.id == id);
    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send("user not found")
    }
})

app.post("/users/:id/:movieTitle", (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find(user => user.id == id);
    
    if (user) {
        user.favouriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to the array of the user with id: ${id}`);
    } else {
        res.status(400).send("user not found")
    }
})

app.delete("/users/:id/:movieTitle", (req, res) => {
    const {id, movieTitle} = req.params;
    
    let user = users.find(user => user.id == id);
    
    if (user) {
        user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from the array of the user with id: ${id}`);
    } else {
        res.status(400).send("user not found")
    }
})

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    
    let user = users.find(user => user.id == id);
    
    if (user) {
        users = users.filter( user => user.id !=id);
        res.status(200).send(` user ${id} has been succesfully removed.`);
    } else {
        res.status(400).send("user not found")
    }
})

app.get("/", (req, res) => {
    res.send("This is a website about movies");
});

app.use(express.static("public"));


app.listen(8080, () => {
    console.log("This server is working!")
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("There was some error");
  });

