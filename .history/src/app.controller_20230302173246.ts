import { Controller, Get } from '@nestjs/common';
import { Message } from './interfaces/message.interface';

@Controller()
export class AppController {

  constructor() {}

  @Get()
  getHello() {

    return this.appService.getHello();

  }
 
}
