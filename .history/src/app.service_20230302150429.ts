import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {

  getConversion(): Message {

    return { statusCode: true, message: 'Conversion successful' };

  }

}
