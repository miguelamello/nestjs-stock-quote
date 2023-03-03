import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {

  getHello(): Message {

    return { statusCode: true, message: 'Please follow the documentation for ' };

  }

}
