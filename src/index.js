//jokes from https://github.com/15Dkatz/official_joke_api

const express = require("express");
const app = express();

const allJokes = require("./theJokes.json");

//configure the app

//register a route handler for GET of '/jokes/random'
//app.get('/jokes/random', serveRandomJoke);

app.get("/", serveWelcome);

app.get("/jokes/first", serveFirstJoke);

app.get("/jokes/search", serveSearchedJokes);

app.get("/plainjokes/first", serveFirstJokePlain);

app.get("/jokes/random", serveRandomJoke);

//It is more typical to write the function inline
//But not clearer
app.get("/jokes", (req, res) => {
  res.json(allJokes);
});

app.get("/jokes/:category", serveJokesFromCategory);
function serveJokesFromCategory(req, res) {
  const cat = req.params.category;
  const foundJokes = allJokes.filter((j) => j.type === cat);
  res.json(foundJokes);
}

const port = process.env.PORT || 5000;
//start the app listening on a port.
app.listen(port, () => {
  console.log("Express server started listening ok, probably on port: " + port);
});

function serveWelcome(req, res) {
  res.send("Hello welcome to joke server");
}

function serveFirstJoke(req, res) {
  res.json(allJokes[0]);
}

function serveFirstJokePlain(req, res) {
  const firstJoke = allJokes[0];
  const text = firstJoke.setup + " " + firstJoke.punchline;
  res.send(text);
}

function serveRandomJoke(req, res) {
  res.json(pick(allJokes));
}

function serveSearchedJokes(req, res) {
  res.json(req.query.searchTerm);
}

function pick(arr) {
  const ix = Math.floor(Math.random() * arr.length);
  return arr[ix];
}

("last statement");
