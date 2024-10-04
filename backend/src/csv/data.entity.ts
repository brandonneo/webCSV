// src/csv/data.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn() // Generate a UUID as primary key
  uid: number;

  @Column({ nullable: true }) // Allow null values for postId
  postId: string | null;

  @Column() // This will store the 'id' from the CSV
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text')
  body: string;
}
