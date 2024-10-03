// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from './csv/csv.module';
import { Data } from './csv/data.entity'; // Ensure the correct import
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'csv_upload',
      entities: [Data],
      synchronize: true,
    }),
    CsvModule,
  ],
})
export class AppModule {}
