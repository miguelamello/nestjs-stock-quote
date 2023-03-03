import { queryParams } from '../interfaces/queryParam.interface';
import { Message } from '../interfaces/message.interface';
import { AwsSqsService } from './aws-sqs.service';
export declare class ConversionController {
    private awsSqsService;
    private openExchangeRatesApiKey;
    private baseRates;
    private calcRates;
    private baseRatesMonitor;
    constructor(awsSqsService: AwsSqsService);
    private sendMailUser;
    private setBaseRates;
    private getBaseRates;
    private getRemoteBaseRates;
    private updateRemoteBaseRates;
    private setCalcRates;
    private getCalcRates;
    private doConversion;
    private checkParams;
    getConversion(queryParams: queryParams): Message;
    getCodes(): Message;
}
