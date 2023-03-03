import { Controller, Get } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Controller()
export class AppController {

  constructor() {}

  @Get()
  getHello() {

    return { 
      statusCode: true, 
      message: 'Please follow the documentation for usage of the microservice. Basically you can pass the following parameters: /conversion/?from=USD&to=EUR&amount=100&email:myname@domain.com' 
    };

  }
 
}
