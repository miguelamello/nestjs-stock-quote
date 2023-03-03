import { Injectable } from '@nestjs/common';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ConversionService {

  registerConservion(): Message {

    return { 
      statusCode: true, 
      message: 'Please follow the documentatm=USD&to=EUR&amount=100&email:myname@domain.com' 
    };

  }

}
