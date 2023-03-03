"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionController = void 0;
const common_1 = require("@nestjs/common");
const validator = require("email-validator");
const currency_codes_1 = require("./currency-codes");
const currency_names_1 = require("./currency-names");
const empty_baserate_1 = require("./empty-baserate");
const aws_sqs_service_1 = require("./aws-sqs.service");
let ConversionController = class ConversionController {
    constructor(awsSqsService) {
        this.awsSqsService = awsSqsService;
        this.openExchangeRatesApiKey = '147b750303264e2fa9de9af6d03974aa';
        this.baseRates = empty_baserate_1.default;
        this.calcRates = {};
        this.baseRatesMonitor = null;
        this.getRemoteBaseRates().then((rates) => {
            this.setBaseRates(rates);
            this.setCalcRates();
            this.updateRemoteBaseRates();
        });
        this.awsSqsService.getMessage$().subscribe((message) => {
            const conversion = this.doConversion(message.body);
            this.sendMailUser(conversion);
        });
    }
    sendMailUser(conversion) {
        const to = conversion.user_email;
        const subject = 'Conversion result';
        const body = `The conversion from ${conversion.source_currency} ${conversion.source_value} to ${conversion.target_currency} is ${conversion.target_value} with a conversion rate of ${conversion.conversion_rate} at ${conversion.utc_datetime}.`;
        console.log(to, subject, body);
    }
    setBaseRates(rates) {
        this.baseRates = rates;
    }
    getBaseRates() {
        return this.baseRates;
    }
    async getRemoteBaseRates() {
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${this.openExchangeRatesApiKey}`);
        return await response.json();
    }
    updateRemoteBaseRates() {
        this.baseRatesMonitor = setInterval(() => {
            this.getRemoteBaseRates().then((rates) => {
                this.setBaseRates(rates);
                this.setCalcRates();
            });
        }, 21600000);
    }
    setCalcRates() {
        const baseRates = this.getBaseRates();
        if (baseRates.timestamp) {
            for (const [key1, value1] of Object.entries(baseRates.rates)) {
                this.calcRates[key1] = {};
                this.calcRates[key1][key1] = 1.00;
                for (const [key2, value2] of Object.entries(baseRates.rates)) {
                    if (key1 === 'USD') {
                        this.calcRates[key1][key2] = +(value2).toFixed(2) || 0;
                    }
                    else {
                        if (key2 == 'USD') {
                            this.calcRates[key1][key2] = +(1 / value1).toFixed(2) || 0;
                        }
                        else {
                            this.calcRates[key1][key2] = +((1 / value1) * value2).toFixed(2) || 0;
                        }
                    }
                }
            }
        }
    }
    getCalcRates() {
        return this.calcRates;
    }
    doConversion(message) {
        const calcRates = this.getCalcRates();
        const conversion = {
            source_currency: message.from + '',
            source_value: (+message.amount).toFixed(2) + '',
            target_currency: message.to + '',
            target_value: (+calcRates[message.from][message.to] * +message.amount).toFixed(2) + '',
            conversion_rate: calcRates[message.from][message.to] + '',
            utc_datetime: new Date().toUTCString(),
            user_email: message.email
        };
        return conversion;
    }
    checkParams(queryParams) {
        if (!queryParams.from)
            throw new common_1.HttpException(`Missing required query parameter: from`, common_1.HttpStatus.BAD_REQUEST);
        if (!queryParams.to)
            throw new common_1.HttpException(`Missing required query parameter: to`, common_1.HttpStatus.BAD_REQUEST);
        if (!queryParams.amount)
            throw new common_1.HttpException(`Missing required query parameter: amount`, common_1.HttpStatus.BAD_REQUEST);
        if (!queryParams.email)
            throw new common_1.HttpException(`Missing required query parameter: email`, common_1.HttpStatus.BAD_REQUEST);
        if (!currency_codes_1.default.some(item => queryParams.from.includes(item)))
            throw new common_1.HttpException(`Currency code ${queryParams.from} not found. Try access /conversion/codes for available currency codes.`, common_1.HttpStatus.BAD_REQUEST);
        if (!currency_codes_1.default.some(item => queryParams.to.includes(item)))
            throw new common_1.HttpException(`Currency code ${queryParams.to} not found. Try access /conversion/codes for available currency codes.`, common_1.HttpStatus.BAD_REQUEST);
        if (isNaN(+queryParams.amount))
            throw new common_1.HttpException(`Amount must be a valid number. Ex: 35.50 or 150`, common_1.HttpStatus.BAD_REQUEST);
        if (!validator.validate(queryParams.email))
            throw new common_1.HttpException(`Email must be a valid mail box name.`, common_1.HttpStatus.BAD_REQUEST);
    }
    getConversion(queryParams) {
        this.checkParams(queryParams);
        this.awsSqsService.sendMessage(queryParams);
        return {
            statusCode: true,
            message: 'Soon you will receive an email with the conversion result. Thank you.'
        };
    }
    getCodes() {
        return {
            statusCode: true,
            message: currency_names_1.default
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ConversionController.prototype, "getConversion", null);
__decorate([
    (0, common_1.Get)('codes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ConversionController.prototype, "getCodes", null);
ConversionController = __decorate([
    (0, common_1.Controller)('conversion'),
    __metadata("design:paramtypes", [aws_sqs_service_1.AwsSqsService])
], ConversionController);
exports.ConversionController = ConversionController;
//# sourceMappingURL=conversion.controller.js.map