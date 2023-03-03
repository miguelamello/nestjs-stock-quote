import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './interfaces/message.interface';

@Controller()

export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(204)
  getConversion(): Message {

    return this.appService.getConversion();

  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }*/
}
