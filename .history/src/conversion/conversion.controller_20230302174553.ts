import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { queryParams } from './interfaces/queryParam.interface';
import { Message } from '../interfaces/message.interface';
import currencyCodes from './currency-codes';

@Controller('conversion')
export class ConversionController {

  constructor() {}

  private checkParams(queryParams: queryParams) { console.log(queryParams.from);
    // check if all 4 required parameters are present
    if (!queryParams.from) throw new HttpException(`Missing required query parameter: from`, HttpStatus.BAD_REQUEST);
    if (!queryParams.to) throw new HttpException(`Missing required query parameter: to`, HttpStatus.BAD_REQUEST);
    if (!queryParams.amount) throw new HttpException(`Missing required query parameter: amount`, HttpStatus.BAD_REQUEST);
    if (!queryParams.email) throw new HttpException(`Missing required query parameter: email`, HttpStatus.BAD_REQUEST);
    // check if all required parameters are valid type
    if ( !currencyCodes.some(item => queryParams.from.includes(item)) ) throw new HttpException(`Currency code ${queryParams.from} not found. Try access /currencyCodes for available currency codes.`, HttpStatus.BAD_REQUEST);
    if ( !currencyCodes.some(item => queryParams.to.includes(item)) ) throw new HttpException(`Currency code ${queryParams.to} not found. Try access /currencyCodes for available currency codes.`, HttpStatus.BAD_REQUEST);
    if ( isNaN(+queryParams.amount) ) throw new HttpException(`Amount must be a valid fraction. Ex: 35.50`, HttpStatus.BAD_REQUEST);
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
