const express = require("express");
const router = express.Router();

const axios = require("axios").create({
  baseUrl:
    "https://klcmuhammet-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/",
});

router.get("/search/books", async (req, res) => {
  axios({
    url: "books",
    method: "get",
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/search/books/title/:title", async (req, res) => {
  axios({
    url: "books/title/" + req.params.title,
    method: "get",
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/search/books/isbn/:isbn", async (req, res) => {
  axios({
    url: "books/isbn/" + req.params.isbn,
    method: "get",
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get("/search/books/author/:author", async (req, res) => {
  axios({
    url: "books/author/" + req.params.author,
    method: "get",
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
module.exports = router;
