// src/csv/csv.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { CreateDataDto } from './csv.dto'; // Ensure this DTO is defined appropriately
import { Response } from 'express'; // Import Response type from express
import * as fs from 'fs'; // Import fs module
import * as csv from 'csv-parser'; // Import csv-parser module
import { diskStorage } from 'multer'; // Import diskStorage from multer
import { v4 as uuuidv4 } from 'uuid'; // For unique filenames

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Folder to save uploaded files
        filename: (req, file, cb) => {
          const uniqueSuffix = uuuidv4(); // Create a unique filename
          const ext = file.originalname.split('.').pop(); // Get file extension
          cb(null, `${uniqueSuffix}.${ext}`); // Set filename
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File not found');
    }

    const results: CreateDataDto[] = [];

    fs.createReadStream(file.path) // Now file.path should be defined
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await Promise.all(
          results.map((result) => this.csvService.create(result)),
        );
      });

    return { message: 'Upload successful' }; // Return a response
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.csvService.findAll(page, pageSize);
  }

  @Patch('update/:uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateDataDto: CreateDataDto,
  ) {
    return this.csvService.update(+uid, updateDataDto);
  }

  @Delete('delete/:uid')
  async remove(@Param('uid') uid: string) {
    return this.csvService.remove(+uid);
  }
}
