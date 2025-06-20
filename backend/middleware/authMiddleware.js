const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  console.log(req.headers);

  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (req.user.isBlocked) {
        return res.status(401).json({
          message: "You are blocked! Contact the admin.",
          success: false,
        });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized", error });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authorization = (roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized - insufficient permissions" });
  }
};

// Export both authentication and authorization
module.exports = {
  authentication,
  authorization,
};