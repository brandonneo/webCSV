// src/csv/csv.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDataDto {
  @IsOptional() // Make postId optional
  @IsString()
  postId: string | null;

  @IsNotEmpty()
  readonly id: number; // CSV 'id'

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  body: string;
}
