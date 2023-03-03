import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import * as validator from 'email-validator';
import { queryParams } from '../interfaces/queryParam.interface';
import BaseRates from '../interfaces/BaseRates';
import CalcRate from '../interfaces/CalcRate';
import Conversion from '../interfaces/Conversion';
import { Message } from '../interfaces/message.interface';
import currencyCodes from './currency-codes';
import currencyNames from './currency-names';
import emptyBaserate from './empty-baserate';
import { AwsSqsService } from './aws-sqs.service';

@Controller('conversion')
export class ConversionController {

  // Open Exchange Rates account ID
  private openExchangeRatesApiKey = '147b750303264e2fa9de9af6d03974aa';

  // Base rate for the conversion
  private baseRates: BaseRates = emptyBaserate; 

  // Calculated rates for the conversion
  private calcRates: CalcRate = {};

  // Timer to update the base rates
  private baseRatesMonitor: NodeJS.Timeout | null = null;

  // Inject the SQS service
  constructor( private awsSqsService: AwsSqsService) {

    // Get the base rates from the remote API
    this.getRemoteBaseRates().then((rates) => {
      this.setBaseRates(rates);
      this.setCalcRates();
      this.updateRemoteBaseRates();
    });

    // Subscribe to the observable to receive messages from the queue
    this.awsSqsService.getMessage$().subscribe((message) => {
      const conversion: Conversion = this.doConversion(message.body);

    });
  }    

  // Set the base rates
  private setBaseRates( rates: BaseRates ) {
    this.baseRates = rates;
  }

  // Get the base rates
  private getBaseRates() { 
    return this.baseRates;
  }

  // Get the latest exchange rates available from the Open Exchange Rates API.
  private async getRemoteBaseRates(): Promise<BaseRates> {
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${this.openExchangeRatesApiKey}`);
    return await response.json();
  }

  // Get the latest exchange rates available from the Open Exchange Rates API.
  private updateRemoteBaseRates() {
    this.baseRatesMonitor = setInterval(() => {
      this.getRemoteBaseRates().then((rates) => {
        this.setBaseRates( rates );
        this.setCalcRates();
      });
    }, 21600000); // 6 hours interval
  }

  // Calculate the conversion rates based on USD.
  private setCalcRates() {
    const baseRates = this.getBaseRates();
    if ( baseRates.timestamp ) {
      for (const [key1, value1] of Object.entries(baseRates.rates)) {
        this.calcRates[key1] = {};
        this.calcRates[key1][key1] = 1.00;
        for (const [key2, value2] of Object.entries(baseRates.rates)) {
          if ( key1 === 'USD') {
            this.calcRates[key1][key2] = +(value2).toFixed(2) || 0; 
          } else {
            if ( key2 == 'USD') {
              this.calcRates[key1][key2] = +(1 / value1).toFixed(2) || 0; 
            } else {
              this.calcRates[key1][key2] = +((1 / value1) * value2).toFixed(2) || 0;
            }
          }
        }
      }
    }
  }

  // Get the calculated rates
  private getCalcRates() {
    return this.calcRates;
  }

  // Do the conversion and return the result to the client.
  private doConversion( message: queryParams ) {
    const calcRates: CalcRate = this.getCalcRates(); 
    const conversion: Conversion = { 
      source_currency: message.from + '', 
      source_value: (+message.amount).toFixed(2) + '', 
      target_currency: message.to + '', 
      target_value: (+calcRates[message.from][message.to] * +message.amount).toFixed(2) + '', 
      conversion_rate: calcRates[message.from][message.to] + '', 
      utc_datetime: new Date().toUTCString()
    };
    return conversion; 
  }

  // Check if all required parameters are present and valid
  private checkParams(queryParams: queryParams) {
    // check if all 4 required parameters are present
    if ( !queryParams.from ) throw new HttpException(`Missing required query parameter: from`, HttpStatus.BAD_REQUEST);
    if ( !queryParams.to ) throw new HttpException(`Missing required query parameter: to`, HttpStatus.BAD_REQUEST);
    if ( !queryParams.amount ) throw new HttpException(`Missing required query parameter: amount`, HttpStatus.BAD_REQUEST);
    if ( !queryParams.email ) throw new HttpException(`Missing required query parameter: email`, HttpStatus.BAD_REQUEST);

    // check if all required parameters are valid type
    if ( !currencyCodes.some(item => queryParams.from.includes(item)) ) throw new HttpException(`Currency code ${queryParams.from} not found. Try access /conversion/codes for available currency codes.`, HttpStatus.BAD_REQUEST);
    if ( !currencyCodes.some(item => queryParams.to.includes(item)) ) throw new HttpException(`Currency code ${queryParams.to} not found. Try access /conversion/codes for available currency codes.`, HttpStatus.BAD_REQUEST);
    if ( isNaN(+queryParams.amount) ) throw new HttpException(`Amount must be a valid number. Ex: 35.50 or 150`, HttpStatus.BAD_REQUEST);
    if ( !validator.validate(queryParams.email) ) throw new HttpException(`Email must be a valid mail box name.`, HttpStatus.BAD_REQUEST);
  }

  // Queue an conversion request from the client and return a message if successful.
  // Exemple: http://localhost:3000/conversion/?from=USD&to=BRL&amount=100.00&email=miguel@gmail.com
  @Get()  
  getConversion( @Query() queryParams: queryParams ): Message {

    this.checkParams(queryParams);
    this.awsSqsService.sendMessage(queryParams);
    return { 
      statusCode: true, 
      message: 'Soon you will receive an email with the conversion result. Thank you.' 
    }
  }

  // Return the available currency codes for conversion to the client.
  // Exemple: http://localhost:3000/conversion/codes
  @Get('codes')  
  getCodes(): Message {

    return { 
      statusCode: true, 
      message: currencyNames
    }
  }
}
