import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.module";
import { Book } from "./book.module";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", nullable: false })
  storeName: string;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @OneToOne(() => User, (user) => user.store)
  user: User;

  @OneToMany(() => Book, (book) => book.store)
  books: Book[];
}
