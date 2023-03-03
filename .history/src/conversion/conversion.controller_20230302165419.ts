import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { queryParams }

@Controller('conversion')
export class ConversionController {

  constructor(private conversionService: ConversionService) {}

  @Get()
  getConversion(
    @Query() queryParams
  ) {

    console.log();
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