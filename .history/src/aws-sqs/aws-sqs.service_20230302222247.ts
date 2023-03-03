import { Injectable } from '@nestjs/common';
import { Squiss, Message } from 'squiss-ts';
import { queryParams } from '../interfaces/queryParam.interface';

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
      queueName: 'awssqs-queue',
      bodyFormat: 'json',
      maxInFlight: 15
    });

    this.start();

  }

  onMessage(message: Message): void {
    console.log(message);
    message.del();
  }

  startListening(): void {
    this.squiss.on('message', this.onMessage.bind(this));
    this.squiss.start();
  }

  async start(): Promise<void> {
    this.startListening();
  }

  async sendMessage( message: queryParams ): Promise<void> {
    const messageToSend = message;
    const propsToSend = {};

    await this.squiss.sendMessage(messageToSend, 0, propsToSend);

  }

}
