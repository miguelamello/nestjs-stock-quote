import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';
import { ConversionService } from './conversion.service';

class CurrencyConversionQueryParams {

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

}

@Controller('conversion')
export class ConversionController {

  @Get()
  async getConversion(

    @Query() queryParams: CurrencyConversionQueryParams,

  ) {

    // check if any of the required query parameters are missing
    const missingParams = Object.keys(queryParams).filter(
      key => queryParams[key] === undefined,
    );
    if (missingParams.length > 0) {
      throw new BadRequestException(
        `Missing required query parameter(s): ${missingParams.join(', ')}`,
      );
    }

    this.appService.registerConservion();
    
  }

}
