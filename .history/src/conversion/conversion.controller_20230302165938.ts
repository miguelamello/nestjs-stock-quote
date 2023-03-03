import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { queryParams } from './interfaces/queryParam.interface';

@Controller('conversion')
export class ConversionController {

  constructor(private conversionService: ConversionService) {}

  private checkParams(queryParams: queryParams) {
    console.log(queryParams.);
  }

  @Get()
  getConversion(
    @Query() queryParams: queryParams,
  ) {

    this.checkParams(queryParams);
    

    return this.conversionService.registerConservion();
    
  }

}
