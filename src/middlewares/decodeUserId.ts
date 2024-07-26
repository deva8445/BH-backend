import jwt from "jsonwebtoken";

export const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'
  console.log(token);

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    return decoded.id;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
