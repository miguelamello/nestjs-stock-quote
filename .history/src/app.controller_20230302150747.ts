import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './interfaces/message.interface';

@Controller()

export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  getConversion(): Message {

    @HttpCode(204)
    return this.appService.getConversion();

  }
}
