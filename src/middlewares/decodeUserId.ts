import jwt from "jsonwebtoken";

export const getUserIdFromToken = (req) => {
  let token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'
  if (!token) return null;

  try {
    token = token.replace(/^"(.*)"$/, "$1");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.id;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
