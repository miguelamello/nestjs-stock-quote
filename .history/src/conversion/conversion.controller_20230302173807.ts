import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { queryParams } from './interfaces/queryParam.interface';
import { Message } from '../interfaces/message.interface';
import { currencyCodes } from 

@Controller('conversion')
export class ConversionController {

  constructor() {}

  private checkParams(queryParams: queryParams) { console.log(queryParams.from);
    // check if all 4 required parameters are present
    if (!queryParams.from) throw new HttpException(`Missing required query parameter: from`, 200);
    if (!queryParams.to) throw new HttpException(`Missing required query parameter: to`, HttpStatus.BAD_REQUEST);
    if (!queryParams.amount) throw new HttpException(`Missing required query parameter: amount`, HttpStatus.BAD_REQUEST);
    if (!queryParams.email) throw new HttpException(`Missing required query parameter: email`, HttpStatus.BAD_REQUEST);
    // check if all required parameters are valid type
    if (queryParams.from) throw new HttpException(`Missing required query parameter: from`, 200);
    if (queryParams.to) throw new HttpException(`Missing required query parameter: to`, HttpStatus.BAD_REQUEST);
    if (queryParams.amount) throw new HttpException(`Missing required query parameter: amount`, HttpStatus.BAD_REQUEST);
    if (queryParams.email) throw new HttpException(`Missing required query parameter: email`, HttpStatus.BAD_REQUEST);
  }

  @Get()
  getConversion( @Query() queryParams: queryParams ): Message {

    this.checkParams(queryParams);
    return { 
      statusCode: true, 
      message: 'Soon you will receive an email with the conversion result. Thank you.' 
    };
    
  }

}
