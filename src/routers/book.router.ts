import express from "express";
import { BooksController } from "../controllers/books/book.controler";
import { validateRequest } from "../middlewares/validationMiddleware";
import { CreateBookDto } from "../controllers/books/book.dto";

export const booksRouter = express.Router();

booksRouter.post("/", validateRequest(CreateBookDto), BooksController.create);
booksRouter.get("/", BooksController.fetchAllBook);

booksRouter.post("/cart", BooksController.addToCart);
booksRouter.get("/cart", BooksController.fetchCartData);
booksRouter.patch("/quantity", BooksController.updateQuantity);
booksRouter.delete("/cart", BooksController.emptyCart);
booksRouter.delete("/cart/:bookId", BooksController.emptySingleCart);
