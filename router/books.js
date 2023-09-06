const express = require("express");
const protected = require("../utils/protected");

const router = express.Router();

let books = [
  {
    title: "Don Quixote",
    isbn: "0001",
    author: "Miguel de Cervantes",
    year: 1605,
    literary_field: "Spain",
    comments: [],
  },
  {
    title: "Romeo and Juliet",
    isbn: "0002",
    author: "William Shakespeare",
    year: 1597,
    literary_field: "English",
    comments: [],
  },
  {
    title: "Sefiller",
    isbn: "0003",
    author: "Victor Hugo",
    year: 1862,
    literary_field: "French",
    comments: [],
  },
];

router.get("/", (req, res) => {
  res.send(JSON.stringify(books, null, 4));
});

router.get("/:title", function (req, res) {
  const title = req.params.title;
  res.send(books.find((book) => book.title === title));
});

router.get("/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books.find((book) => book.isbn === isbn));
});

router.get("/:author", function (req, res) {
  const author = req.params.author;
  res.send(books.find((book) => book.author === author));
});

router.get("/comment/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books.find((book) => book.isbn === isbn).comments);
});

router.post("/comment", protected.auth, function (req, res) {
  const { isbn, text } = req.body;

  const book = books.find((book) => book.isbn === isbn);
  if (book) res.status(400);

  book.comments.join({
    text,
    author: req.user,
  });

  books[book] = book;

  res.send(books[book]);
});

router.put("/comment", protected.auth, function (req, res) {
  const { isbn, oldText, text } = req.body;

  const book = books.find((book) => book.isbn === isbn);
  if (book) res.status(400);

  const comment = book.comments.find((comment) => comment.text === oldText);
  if (comment) res.status(400);

  if (comment.user !== req.user) res.status(400);

  book.comments[comment] = { ...comment, text };

  books[book] = book;

  res.send(books[book]);
});

router.delete("/comment", protected.auth, function (req, res) {
  const { isbn, text } = req.body;

  const book = books.find((book) => book.isbn === isbn);
  if (book) res.status(400);

  const comment = book.comments.find((comment) => comment.text === text);
  if (comment) res.status(400);

  if (comment.user !== req.user) res.status(400);

  delete book.comments[comment];

  books[book] = book;

  res.send(books[book]);
});

module.exports = router;
