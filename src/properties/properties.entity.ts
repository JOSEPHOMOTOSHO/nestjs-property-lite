import { User } from '../auth/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { status } from './property-status.enum';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: status;
  @Column('float')
  price: number;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_on: Date;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne((_type) => User, (owner) => owner.properties, { eager: false })
  @Exclude({ toPlainOnly: true })
  owner: User;
}
