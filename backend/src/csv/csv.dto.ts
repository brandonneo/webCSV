// src/csv/csv.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateDataDto {
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  body: string;
}
