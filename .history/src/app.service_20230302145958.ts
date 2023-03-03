import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class AppService {
  getConversion(): string {
    return { status: true, message: 'Conversion successful' };
  }
}
