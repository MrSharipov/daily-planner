const jwt = require("jsonwebtoken");
const { handleError } = require("../helpers");

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.AUTH_SECRET, {
    expiresIn: process.env.AUTH_EXPIRE,
  });
};
const verifyToken = async (token) => {
  return jwt.verify(token, process.env.AUTH_SECRET);
};

const getAuthorization = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  const [authType, authToken] = auth.split(" ");

  if (authType !== "Bearer") {
    return res.status(401).json({ error: "Authorization type is not valid" });
  }

  try {
    const verifiedTokenData = await verifyToken(authToken);
    req.userId = verifiedTokenData.id;
    next();
  } catch (err) {
    return res.json(handleError(err.message, 401, err.name));
  }
};

// Write a middleware function to defend routes
// your code...

module.exports = {
  generateToken,
  getAuthorization,
};
