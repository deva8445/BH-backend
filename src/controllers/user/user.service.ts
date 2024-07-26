import bcrypt from "bcryptjs";
import { User } from "../../modules/user.module";
import { AppDataSource } from "../../ormconfig";

export const UserService = {
  createUser: async (userDto, transactionalEntityManager) => {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const newUser = transactionalEntityManager.create(User, userDto);
    await transactionalEntityManager.save(newUser);
    return newUser;
  },

  findUserByEmail: async (email) => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.findOne({ where: { email } });
  },

  findUserByContact: async (contact) => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.findOne({ where: { contact } });
  },

  validatePassword: async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};
