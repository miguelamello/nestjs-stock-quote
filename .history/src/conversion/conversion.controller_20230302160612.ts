import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

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
    // your conversion logic goes here
    // you can access the query parameters using queryParams.from, queryParams.to, queryParams.amount, and queryParams.email

    // check if any of the required query parameters are missing
    const missingParams = Object.keys(queryParams).filter(
      key => queryParams[key] === undefined,
    );
    if (missingParams.length > 0) {
      throw new BadRequestException(
        `Missing required query parameter(s): ${missingParams.join(', ')}`,
      );
    }

    // if all query parameters are present, proceed with conversion logic
  }

}
