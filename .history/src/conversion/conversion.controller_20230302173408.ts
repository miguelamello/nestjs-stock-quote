import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { queryParams } from './interfaces/queryParam.interface';

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
  getConversion( @Query() queryParams: queryParams ) {

    this.checkParams(queryParams);
    return this.conversionService.registerConservion();
    
  }

}
