const express = require("express");
const session = require("express-session");
const booksdb = require("./router/booksdb.js");
const auth_users = require("./router/auth_users.js");
const general = require("./router/general.js");

const app = express();
app.use(express.json());
app.use(session({ secret: "fingerpint" }));
app.use(express.json());

const PORT = 5000;

app.use("/", general);
app.use("/books", booksdb);
app.use("/users", auth_users);
app.listen(PORT, () => console.log("Server is running"));
