import { asyncHandler } from "../../middlewares/asyncHandler";
import { getUserId, validateUser } from "../../utils/helper/getUserIdFromToken";
import { BookService } from "./book.service";

export const BooksController = {
  create: asyncHandler(async (req, res) => {
    const userId = getUserId(req, res);
    await BookService.addBook(userId, req.body);
    res.status(201).json({ message: "Book added sucessfully" });
  }),

  fetchAllBook: asyncHandler(async (req, res) => {
    validateUser(req, res);
    const books = await BookService.fetchAllBooks(req.query);
    res.status(200).json({ message: "Sucessfully fetched all books", books });
  }),

  addToCart: asyncHandler(async (req, res) => {
    const userId = getUserId(req, res);
    const { bookId } = req.body;
    await BookService.addToCart(res, userId, bookId);
    res.status(201).json({ message: "Book added to cart" });
  }),

  fetchCartData: asyncHandler(async (req, res) => {
    const userId = getUserId(req, res);
    const bookCartList = await BookService.fetchCartList(userId);
    res.status(201).json({ message: "Products in cart", bookCartList });
  }),

  updateQuantity: asyncHandler(async (req, res) => {
    const userId = getUserId(req, res);
    const { quantity, bookId } = req.body;
    if (!quantity || !bookId) {
      return res
        .status(400)
        .json({ message: "Quantity and bookId are required" });
    }

    await BookService.updateQuantity(req, res, userId);
    res.status(200).json({ message: "Quantity updated successfully" });
  }),

  emptyCart: asyncHandler(async (req, res) => {
    const userId = getUserId(req, res);
    await BookService.emptyCart(userId);
    res.status(200).json({ message: "Cart emptied successfully" });
  }),

  emptySingleCart: asyncHandler(async (req, res) => {
    const userId = getUserId(req, res);
    console.log(req.params);

    await BookService.emptySingleCart(req, res, userId);
    res.status(200).json({ message: "One item deleted successfully" });
  }),
};
