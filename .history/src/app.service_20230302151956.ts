import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Injectable()
export class AppService {

  getHello(): Message {

    return { 
      statusCode: true, 
      message: `Please follow the documentation for usage of the microservice. 
      Basically, you need to send a POST request to the /api/v1/translate endpoint with the following body:` 
    };

  }

}
