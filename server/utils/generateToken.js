import jwt from "jsonwebtoken";

const generateToken = (
  res,
  userId,
  cookieName,
  expiration = 30 * 24 * 60 * 60 * 1000
) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expiration / 1000,
  });

  res.cookie(cookieName, token, {
    httpOnly: true,
    maxAge: expiration,
  });

  return token;
};

export default generateToken;
