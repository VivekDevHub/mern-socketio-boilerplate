const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Read the Authorization header
  const authHeader = req.headers.authorization;

  // 2. Check for the "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  // 3. Extract the token
  const token = authHeader.split(" ")[1];

  // 4. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 5. Attach the user ID to the request
    req.userId = decoded.id;
    // 6. Move to the next handler
    next();
  } catch (error) {
    // 7. Token is invalid
    res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

module.exports = authMiddleware;
