// src/csv/data.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  body: string;
}
