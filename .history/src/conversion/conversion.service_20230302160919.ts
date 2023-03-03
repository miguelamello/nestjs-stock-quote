import { Injectable } from '@nestjs/common';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ConversionService {

  registerConservion(): Message {

    return { 
      statusCode: true, 
      message: '' 
    };

  }

}
