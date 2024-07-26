import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Store } from "./store.module";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "bigint" })
  contact: number;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  userType: string;

  @OneToOne(() => Store)
  @JoinColumn()
  store: Store;
}
