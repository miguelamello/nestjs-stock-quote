import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {
  getConversion(): string {
    return { status: true, message: 'Conversion successful' };
  }
}
