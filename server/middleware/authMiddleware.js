import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-passwordHash");

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized. User not found." });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, Token failed." });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized. No token." });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin." });
  }
};

const authorizeSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Super Admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an super admin." });
  }
};

export { authenticate, authorizeAdmin, authorizeSuperAdmin };
