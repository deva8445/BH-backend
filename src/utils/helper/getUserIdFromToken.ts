import { getUserIdFromToken } from "../../middlewares/decodeUserId";

export const getUserId = (req, res) => {
  const userId = getUserIdFromToken(req);
  return userId ?? res.status(401).json({ message: "Unauthorized" });
};

export const validateUser = (req, res) => {
  const userId = getUserIdFromToken(req);
  return !userId && res.status(401).json({ message: "Unauthorized" });
};
