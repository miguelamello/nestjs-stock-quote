import { Injectable } from '@nestjs/common';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ConversionService {

  registerConservion(): Message {

    return { 
      statusCode: true, 
      message: 'Please follow the documentation fass the following parameters: /conversion/?from=USD&to=EUR&amount=100&email:myname@domain.com' 
    };

  }

}
