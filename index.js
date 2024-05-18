const express = require("express"),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();

let users = [
  // QUESTION
  // Is it necessary to have some existing users in here, or could it also be empty?
    {
      "ID": 1,
      "name": "Sarah",
      "favouriteMovies": 'The lakehouse'
    },

    {
      "ID": 2,
      "name": "Margarita",
      "favouriteMovies": "Dumb and Dumber"
    }
];

let movies = [
    {
      "Title": "The lakehouse",
      "Released": 2006,
      "Description": "A lonely doctor who once occupied an unusual lakeside house begins to exchange love letters with its former resident, a frustrated architect. They must try to unravel the mystery behind their extraordinary romance before it's too late.",
      "Genre": {
        "Name": "Romance",
        "Description": "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
      },
      "Director": {
        "Name": "Alejandro Agresti",
        "Bio": "Alejandro Agresti was born on 2 June 1961 in Buenos Aires, Argentina. He is a director and writer, known for Buenos Aires Vice Verse (1996), El viento se llevó lo que (1998) and Un mundo menos peor (2004).",
        "Birth year": "1961",
        "Death year": "N/A"
       },
      "Image URL": "something something"
    },

    {
      "Title": "Good will hunting",
      "Released": 1997,
      "Description": "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
      "Genre": {
        "Name": "Drama",
        "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      },
        "Director":  {
        "Name": "Gus Van Sant",
         "Bio": "Gus Green Van Sant Jr. is an American filmmaker, painter, screenwriter, photographer and musician from Louisville, Kentucky who is known for directing films such as Good Will Hunting, the 1998 remake of Psycho, Gerry, Elephant, My Own Private Idaho, To Die For, Milk, Last Days, Finding Forrester, Promised Land, Drugstore Cowboy and Mala Noche.",
      "Birth year": "1952",
      "Death year": "N/A"
    },
      "Image URL": "something something"
    },

    {
      "Title": "Awakenings",
      "Released": 1990,
      "Description": "The victims of an encephalitis epidemic many years ago have been catatonic ever since, but now a new drug offers the prospect of reviving them.",
      "Genre": {
         "Name": "Drama",
         "Descreption": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      },
      "Director":  {
        "Name": "Carole Penny Marshall",
      "Bio": "Carole Penny Marshall is best known for her role as Laverne DeFazio on the television sitcom Laverne & Shirley (1976–1983), receiving three nominations for the Golden Globe Award for Best Actress – Television Series Musical or Comedy for her portrayal.",
      "Birth year": "1943",
      "Death year": "2018"
    },
      "Image URL": "something something"
    },

    {
      "Title": "Ford v Ferrari",
      "Released": 2019,
      "Description": "American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.",
      "Genre": {
        "Name": "Action",
       "Description": "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. ",
      },
       "Director":  {
        "Name": "James Mangold",
         "Bio": "James Mangold is an American film and television director, screenwriter and producer. Films he has directed include Girl, Interrupted (1999), Walk the Line (2005), which he also co-wrote, the 2007 remake 3:10 to Yuma (2007), The Wolverine (2013), and Logan (2017).Mangold also wrote and directed Cop Land (1997), starring Sylvester Stallone, Robert De Niro, Harvey Keitel, and Ray Liotta.",
        "Birth year": "1963",
         "Death year": "N/A"
  },
      "Image URL": "something something"
    },

    {
      "Title": "The Godfather",
      "Released": 1972,
      "Description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      "Genre": {
          "Name": "Drama",
          "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      },
      "Director": {
      "Name": "Francis Ford Coppola",
      "Bio": "Francis Ford Coppola graduated with a degree in drama from Hofstra University, and did graduate work at UCLA in filmmaking. He was training as assistant with filmmaker Roger Corman, working in such capacities as sound-man, dialogue director, associate producer and, eventually, director of The Haunted and the Hunted (1963), Coppola's first feature film.",
      "Birth year": "1939",
      "Death year": "N/A",
      "Image URL": "something something"
      }
    },

    {
      "Title": "Scarface",
      "Released": 1983,
      "Description": "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
      "Genre":{
        "Name" : "Drama",
        "Description" : "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      },
        "Director":  {
        "Name": "Brian De Palma",
      "Bio": "Brian De Palma is one of the well-known directors who spear-headed the new movement in Hollywood during the 1970s. He is known for his many films that go from violent pictures, to Hitchcock-like thrillers.",
      "Birth year": 1940,
      "Death year": "N/A"
    },
      "Image URL": "something something"
    },

    {
      "Title": 21,
      "Released": 2008,
      "Description": "Inspired by real events and people, 21 is about six MIT students who become trained to be experts in card counting in Black Jack and subsequently took Vegas casinos for millions in winnings.",
      "Genre":{
        "Name": "Drama",
        "Description": "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      },
      "Director":  {
        "Name": "Robert Luketic",
        "Bio":  "Robert Luketic is a director and writer, known for The Ugly Truth (2009), Killers (2010) and 21 (2008).",
        "Birth year": 1973,
        "Death year": "N/A"
       },
      "Image URL": "something something"
    },

    {
      "Title": "The Matrix",
      "Released": 1999,
      "Description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
      "Genre": {
        "Name": "Action",
        "Description": "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work."
      },
        "Director":  {
        "name": "Lana Wachowski",
      "Bio": "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). ",
      "Birth year": "1965",
      "Death year": "N/A"
    },
      "Image URL": "something something"
    },

    {
      "Title": "The Lord of the Rings",
      "Released": 2001,
      "Description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      "Genre": {
        "Name": "Adventure",
        "Description": "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, comedy, drama, fantasy, science fiction, family, horror, war, or the medium of animation."
      },
      "Director":  {
        "Name": "Peter Jackson",
      "Bio": "Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards.",
      "Birth year": 1961,
      "Death year": "N/A"
    },
      "Image URL": "something something"
    },

    {
      "Title": "Dumb and Dumber",
      "Released": 1994,
      "Description": "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
      "Genre": {
        "Name": "Comedy",
        "Description": "A comedy film is a film genre that emphasizes humor. These films are designed to amuse audiences and make them laugh."
      },
      "Director": {
        "Name": "Bobby Farrelly",
      "Bio": "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
      "Birth year": "1958",
      "Death year": "N/A"
    },
      "Image URL": "something something"
    }
  ];



app.use(morgan("common"));

app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        URLSearchParams.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users must have a name')
    }
})

app.get("/movies", (req, res) => {
   res.sendFile('/movies.json', {root: __dirname});
});

app.get("/movies/:title", (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("movie not found")
    }
})

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

app.post('/users', (req,res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
})

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.bod;
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
        user.favoutiteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to the array of the user with id: ${id}`);
    } else {
        res.status(400).send("user not found")
    }
})

app.delete("/users/:id/:movieTitle", (req, res) => {
    const {id, movieTitle} = req.params;
    
    let user = users.find(user => user.id == id);
    
    if (user) {
        user.favoutiteMovies = user.favouriteMovies.filter(title !== movieTitle);
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

