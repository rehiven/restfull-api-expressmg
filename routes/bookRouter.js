const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();
  //Filtra todos
  bookRouter
    .route("/books")
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
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
  bookRouter.route("/booksg").get((req, res) => {
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
  return bookRouter;
}

module.exports = routes;
