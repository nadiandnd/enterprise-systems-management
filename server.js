const jsonServer = require("json-server");
const jsonwebtoken = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use(middlewares);

const JWT_SECRET_KEY = "your_secret_key";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).jsonp({ message: "No token provided" });
  }

  jsonwebtoken.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).jsonp({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

server.post("/auth", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.jsonp({
      id: user.id,
      username: user.username,
      token: token,
    });
  } else {
    res.status(401).jsonp({ message: "Invalid credentials" });
  }
});

server.use("/api", verifyToken);
server.get("/api/dashboard", (req, res) => {
  res.jsonp({
    message: "This is a protected route",
    user: req.user,
  });
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
