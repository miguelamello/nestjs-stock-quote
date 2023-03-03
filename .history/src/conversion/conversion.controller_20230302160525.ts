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



}
