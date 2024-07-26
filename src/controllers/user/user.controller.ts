import jwt from "jsonwebtoken";
import { AppDataSource } from "../../ormconfig";
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { CreateStoreDto } from "../store/store.dto";
import { StoreService } from "../store/store.service";
import { asyncHandler } from "../../middlewares/asyncHandler";

export const UserController = {
  signUp: asyncHandler(async (req, res) => {
    await AppDataSource.transaction(async (tranEntityManager) => {
      const userDto = new CreateUserDto();
      Object.assign(userDto, req.body);

      const existingUser = await UserService.findUserByEmail(userDto.email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = await UserService.createUser(userDto, tranEntityManager);

      if (userDto.userType === "seller") {
        const storeDto = new CreateStoreDto();
        storeDto.storeName = req.body.storeName;

        const newStore = await StoreService.createStore(
          storeDto,
          tranEntityManager
        );
        newUser.store = newStore;
        await tranEntityManager.save(newUser);
      }
    });

    return res.status(200).json({ message: "User created successfully" });
  }),

  logIn: asyncHandler(async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret not defined" });
    }

    const { contact, password } = req.body;

    const checkUser = await UserService.findUserByContact(contact);

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await UserService.validatePassword(
      password,
      checkUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        contact: checkUser.contact,
        email: checkUser.email,
        userType: checkUser.userType,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  }),
};
