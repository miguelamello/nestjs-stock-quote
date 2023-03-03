import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { queryParams } from './interfaces/queryParam.interface';

@Controller('conversion')
export class ConversionController {

  constructor(private conversionService: ConversionService) {}

  private checkParams(queryParams: queryParams) {
    console.log(typeof queryParams);
  }

  @Get()
  getConversion(
    @Query() queryParams: queryParams,
  ) {

    this.(queryParams);
    // check if any of the required query parameters are missing
    /*const missingParams = Object.keys(queryParams).filter(
      key => queryParams[key] === undefined,
    ); console.log(@Query('from'));
    if (missingParams.length > 0) {
      throw new BadRequestException(
        `Missing required query parameter(s): ${missingParams.join(', ')}`,
      );
    }*/

    return this.conversionService.registerConservion();
    
  }

}
