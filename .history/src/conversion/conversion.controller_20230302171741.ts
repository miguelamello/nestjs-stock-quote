import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { queryParams } from './interfaces/queryParam.interface';

@Controller('conversion')
export class ConversionController {

  constructor(private conversionService: ConversionService) {}

  private checkParams(queryParams: queryParams) {
    // check if all 4 required parameters are present
    if (!queryParams.from) throw new HttpException(`Missing required query parameter(s): from`,);
    if (!queryParams.to) throw new HttpException(`Missing required query parameter(s): from`,);
    if (!queryParams.amount) throw new HttpException(`Missing required query parameter(s): from`,);
    if (!queryParams.email) throw new HttpException(`Missing required query parameter(s): from`,);
  }

  @Get()
  getConversion( @Query() queryParams: queryParams ) {

    this.checkParams(queryParams);
    return this.conversionService.registerConservion();
    
  }

}
