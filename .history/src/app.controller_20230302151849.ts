import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './interfaces/message.interface';

@Controller()

export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Message {

    return this.appService.getHello();

  }

  /*@Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }*/
}
