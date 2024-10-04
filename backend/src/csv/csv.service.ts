import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import { Readable } from 'stream';
import { Data } from './data.entity'; // Ensure this points to your Data entity
import { CreateDataDto } from './csv.dto';

@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>, // Inject the Data repository
  ) {}
  // async create(dataDto: CreateDataDto): Promise<Data> {
  //   const data = this.dataRepository.create(dataDto); // Create an instance of the entity
  //   return this.dataRepository.save(data); // Save to the database
  // }
  async create(createDataDto: CreateDataDto) {
    const data = this.dataRepository.create(createDataDto);
    return await this.dataRepository.save(data);
  }
  // async processCsv(fileBuffer: Buffer) {
  //   const results: Data[] = []; // Change to your Data type

  //   const readable = new Readable();
  //   readable.push(fileBuffer);
  //   readable.push(null);

  //   // Parse the CSV data
  //   readable
  //     .pipe(csv())
  //     .on('data', (data) => {
  //       // Create a new Data object for each row
  //       const dataEntry = new Data();
  //       dataEntry.postId = +data.postId; // Ensure proper type conversion
  //       dataEntry.name = data.name;
  //       dataEntry.email = data.email;
  //       dataEntry.body = data.body;
  //       results.push(dataEntry);
  //     })
  //     .on('end', async () => {
  //       // Save all entries to the database
  //       try {
  //         await this.dataRepository.save(results);
  //         console.log('Data saved to the database:', results);
  //       } catch (error) {
  //         console.error('Error saving data to the database:', error);
  //       }
  //     })
  //     .on('error', (error) => {
  //       console.error('Error processing CSV file:', error);
  //     });
  // }

  // Find all entries
  // Modify the findAll method to accept pagination parameters
  async findAll(page: number, pageSize: number): Promise<Data[]> {
    const [results, total] = await this.dataRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return results; // Return the paginated results
  }

  // Update an entry
  async update(uid: number, updateData: Partial<Data>): Promise<Data> {
    await this.dataRepository.update(uid, updateData); // Update the record by ID
    return this.dataRepository.findOneBy({ uid }); // Return the updated record
  }

  // Remove an entry
  async remove(uid: number): Promise<void> {
    await this.dataRepository.delete(uid); // Delete the record by ID
  }
}
