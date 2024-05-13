const express = require("express"),
morgan = require('morgan');

const app = express();


//app.use(morgan("common"));

app.get("/movies", (req, res) => {
   res.sendFile('/movies.json', {root: __dirname});
});

app.get("/", (req, res) => {
    res.sendFile("/log.txt", {root: __dirname});
});

app.use(express.static("public"));


app.listen(8080, () => {
    console.log("This server is working!")
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("There was some error");
  });

