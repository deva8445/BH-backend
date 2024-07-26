import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./book.module";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  bookId: string;

  @Column({ nullable: true })
  quantity: number;

  @Column()
  userId: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "bookId" })
  book: Book;
}
