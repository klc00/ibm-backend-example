const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  if (req.session.authorization) {
    token = req.session.authorization["accessToken"];
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
}

function sign(password) {
  return jwt.sign(
    {
      data: password,
    },
    "access",
    { expiresIn: 60 * 60 }
  );
}

module.exports = {
  auth,
  sign,
};
