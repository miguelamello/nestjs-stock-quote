import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/';

@Injectable()
export class AppService {
  getConversion(): string {
    return { status: true, message: 'Conversion successful' };
  }
}
