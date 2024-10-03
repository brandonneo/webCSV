import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { Data } from './data.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  providers: [CsvService],
  controllers: [CsvController]
})
export class CsvModule {}
