import { ILike, Like } from "typeorm";
import { Book } from "../../modules/book.module";
import { User } from "../../modules/user.module";
import { AppDataSource } from "../../ormconfig";
import { title } from "process";
import { Cart } from "../../modules/cart.module";

export const BookService = {
  async addBook(userId: string, bookData: Partial<Book>) {
    const bookRepository = AppDataSource.getRepository(Book);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["store"],
    });

    if (!user || !user.store) {
      throw new Error("User or user's store not found");
    }

    const existingBook = await bookRepository.findOne({
      where: {
        title: bookData.title,
        author: bookData.author,
      },
    });

    if (existingBook) {
      throw new Error("Book already exists");
    }

    const newBook = bookRepository.create({
      ...bookData,
      store: user.store,
    });

    return await bookRepository.save(newBook);
  },

  async fetchAllBooks({ searchBy, sortBy }) {
    const bookRepo = AppDataSource.getRepository(Book);
    const findOptions: any = {
      where: [],
      order: {},
    };

    if (searchBy) {
      findOptions.where.push({ title: ILike(`%${searchBy}%`) });
      findOptions.where.push({ author: ILike(`%${searchBy}%`) });
    }

    findOptions.order.title = sortBy ?? "ASC";

    return await bookRepo.find(findOptions);
  },

  async addToCart(res, userId, bookId) {
    const cartRepo = AppDataSource.getRepository(Cart);
    const bookRepo = AppDataSource.getRepository(Book);

    const checkBook = await bookRepo.findOne({ where: { id: bookId } });
    if (!checkBook) throw Error("Currently not available in the store");

    const checkBookCart = await cartRepo.findOne({
      where: { userId, bookId },
    });

    if (checkBookCart) {
      // await cartRepo.update(checkBookCart.id, {
      //   quantity: checkBookCart.quantity + 1,
      // });
      return res.status(400).json({ message: "Item already added to cart" });
    } else {
      const newCartItem = cartRepo.create({ userId, bookId, quantity: 1 });
      await cartRepo.save(newCartItem);
    }
  },

  async fetchCartList(userId) {
    const cartRepo = AppDataSource.getRepository(Cart);
    return await cartRepo.find({
      where: userId,
      relations: ["book", "book.store"],
    });
  },

  async updateQuantity(req, res, userId) {
    const { quantity, bookId } = req.body;
    const cartRepo = AppDataSource.getRepository(Cart);
    const cartItem = await cartRepo.findOne({ where: { userId, bookId } });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;

    await cartRepo.save(cartItem);
  },

  async emptyCart(userId) {
    const cartRepo = AppDataSource.getRepository(Cart);
    await cartRepo.delete({ userId });
  },

  async emptySingleCart(req, res, userId) {
    const { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    const cartRepo = AppDataSource.getRepository(Cart);
    const cartItem = await cartRepo.findOne({ where: { userId, bookId } });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    await cartRepo.remove(cartItem);
  },
};
