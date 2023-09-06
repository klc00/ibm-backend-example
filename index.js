const express = require("express");
const session = require("express-session");
const books = require("./router/books.js");
const users = require("./router/users.js");

const app = express();
app.use(express.json());
app.use(session({ secret: "fingerpint" }));
app.use(express.json());

const PORT = 5000;
app.get("/", (req, res) => {
  return res.send("");
});
app.use("/books", books);
app.use("/users", users);
app.listen(PORT, () => console.log("Server is running"));
