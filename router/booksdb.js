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
        review: [],
    },
    {
        title: "Romeo and Juliet",
        isbn: "0002",
        author: "William Shakespeare",
        year: 1597,
        literary_field: "English",
        review: [],
    },
    {
        title: "Sefiller",
        isbn: "0003",
        author: "Victor Hugo",
        year: 1862,
        literary_field: "French",
        review: [],
    },
];

router.get("/", (req, res) => {
    res.send(JSON.stringify(books, null, 4));
});

router.get("/title/:title", function (req, res) {
    const title = req.params.title;
    res.send(books.find((book) => book.title === title));
});

router.get("/isbn/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    res.send(books.find((book) => book.isbn === isbn));
});

router.get("/author/:author", function (req, res) {
    const author = req.params.author;
    res.send(books.filter((book) => book.author === author));
});

router.get("/review/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    res.send(books.find((book) => book.isbn === isbn).review);
});

router.post("/review", protected.auth, function (req, res) {
    const { isbn, text } = req.body;

    const bookIndex = books.findIndex((book) => book.isbn === isbn);
    const book = books[bookIndex]

    if (book) res.status(400);

    book.review.push({
        text,
        author: req.user,
    });

    books[bookIndex] = book;

    res.send(books[bookIndex]);
});

router.put("/review", protected.auth, function (req, res) {
    const { isbn, oldText, text } = req.body;

    const bookIndex = books.findIndex((book) => book.isbn === isbn);
    const book = books[bookIndex]

    if (book) res.status(400);

    const commentIndex = book.review.findIndex((comment) => comment.text === oldText);
    const comment = book.review[commentIndex]
    if (comment) res.status(400);

    if (comment.user !== req.user) res.status(400);

    book.review[commentIndex] = { ...comment, text };

    books[bookIndex] = book;

    res.send(books[bookIndex]);
});

router.delete("/review", protected.auth, function (req, res) {
    const { isbn, text } = req.body;

    const bookIndex = books.findIndex((book) => book.isbn === isbn);
    const book = books[bookIndex]

    if (book) res.status(400);

    const commentIndex = book.review.findIndex((comment) => comment.text === text);
    const comment = book.review[commentIndex]

    if (comment) res.status(400);

    if (comment.user !== req.user) res.status(400);

    delete book.review[commentIndex];

    books[bookIndex] = book;

    res.send(books[bookIndex]);
});

module.exports = router;
