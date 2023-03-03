import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { queryParams } from './interfaces/queryParam.interface';

@Controller('conversion')
export class ConversionController {

  constructor(private conversionService: ConversionService) {}

  private checkParams(queryParams: queryParams) { console.log(queryParams);
    // check if all 4 required parameters are present
    if (!queryParams.from) throw new HttpException(`Missing required query parameter(s): from`, 200);
    if (!queryParams.to) throw new HttpException(`Missing required query parameter(s): from`, HttpStatus.BAD_REQUEST);
    if (!queryParams.amount) throw new HttpException(`Missing required query parameter(s): from`, HttpStatus.BAD_REQUEST);
    if (!queryParams.email) throw new HttpException(`Missing required query parameter(s): from`, HttpStatus.BAD_REQUEST);
  }

  @Get()
  getConversion( @Query() queryParams: queryParams ) {

    this.checkParams(queryParams);
    return this.conversionService.registerConservion();
    
  }

}
