import { Injectable } from '@nestjs/common';
import { Message } from '../interfaces/message.interface';

@Injectable()
export class ConversionService {

  registerConservion(): Message {

    return { 
      statusCode: true, 
      message: 'Soon for the email with the conversion result.' 
    };

  }

}
