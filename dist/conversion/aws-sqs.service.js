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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSqsService = void 0;
const common_1 = require("@nestjs/common");
const squiss_ts_1 = require("squiss-ts");
const rxjs_1 = require("rxjs");
let AwsSqsService = class AwsSqsService {
    constructor() {
        this.message$ = new rxjs_1.Subject();
        const awsConfig = {
            accessKeyId: 'dummy',
            secretAccessKey: 'dummy',
            region: 'dummy',
            endpoint: 'http://localhost:9324'
        };
        this.squiss = new squiss_ts_1.Squiss({
            awsConfig,
            queueName: 'awssqs-queue',
            bodyFormat: 'json',
            maxInFlight: 15
        });
        this.start();
    }
    getMessage$() {
        return this.message$.asObservable();
    }
    onMessage(message) {
        this.message$.next(message);
        message.del();
    }
    startListening() {
        this.squiss.on('message', this.onMessage.bind(this));
        this.squiss.start();
    }
    async start() {
        this.startListening();
    }
    async sendMessage(message) {
        await this.squiss.sendMessage(message, 0, {});
    }
};
AwsSqsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AwsSqsService);
exports.AwsSqsService = AwsSqsService;
//# sourceMappingURL=aws-sqs.service.js.map