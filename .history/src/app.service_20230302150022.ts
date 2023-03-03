import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {
  getConversion(): Message {
    return { status: true, message: 'Conversion successful' };
  }
}
