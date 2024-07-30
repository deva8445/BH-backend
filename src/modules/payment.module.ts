import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  orderId: string;

  @Column()
  paymentId: string;

  @Column()
  signature: string;

  @Column()
  date: Date;
}
