import express from "express";
import { BooksController } from "../controllers/books/book.controler";
import { validateRequest } from "../middlewares/validationMiddleware";
import { CreateBookDto } from "../controllers/books/book.dto";

const router = express.Router();

router.post("/", validateRequest(CreateBookDto), BooksController.create);
router.get("/", BooksController.fetchAllBook);

router.post("/cart", BooksController.addToCart);
router.get("/cart", BooksController.fetchCartData);
router.patch("/quantity", BooksController.updateQuantity);
router.delete("/cart", BooksController.emptyCart);
router.delete("/cart/:bookId", BooksController.emptySingleCart);

export default router;
