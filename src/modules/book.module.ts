import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.module";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  author: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "bigint" })
  price: number;

  @Column({ type: "bigint", nullable: true })
  publishYear: number;

  // @Column({ type: "bigint" })
  // quantity: number;

  @ManyToOne(() => Store, (store) => store.books)
  store: Store;
}
