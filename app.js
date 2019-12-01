const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/bookAPI");

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const bookGenreRouter = express.Router();
const Book = require("./models/bookModel");


//Filtra todos
bookRouter.route("/books").get((req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

//Filtro por Id
bookRouter.route("/books/:bookId").get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

//Filtra por genero
bookGenreRouter.route("/booksGenre").get((req, res) => {
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
  Book.find(query, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});

app.use("/api", bookRouter);

app.use("/api", bookGenreRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API!!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
