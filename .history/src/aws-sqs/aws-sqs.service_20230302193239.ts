import { Injectable } from '@nestjs/common';
import { Squiss, Message } from 'squiss-ts';

@Injectable()
export class AwsSqsService {

  private readonly squiss: Squiss;

  constructor() {
    const awsConfig = {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
      region: 'dummy',
      endpoint: 'http://localhost:9324'
    };

    this.squiss = new Squiss({
      awsConfig,
      queueName: 'my-sqs-queue',
      bodyFormat: 'json',
      maxInFlight: 15
    });
  }

}
