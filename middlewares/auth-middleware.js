const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.AUTH_SECRET, { expiresIn: "1h" });
};
const verifyToken = async (token) => {
  return await jwt.verify(token, "secret");
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
    next();
    console.log(verifiedTokenData);
  } catch (err) {
    console.log(err);
  }
};

// Write a middleware function to defend routes
// your code...

module.exports = {
  generateToken,
  getAuthorization,
};
