import { Injectable } from '@nestjs/common';
import { Squiss, Message } from 'squiss-ts';
import { Subject, Observable } from 'rxjs';
import { queryParams } from '../interfaces/queryParam.interface';

@Injectable()
export class AwsSqsService {

  private readonly squiss: Squiss; // AWS SQS service
  private readonly message$ = new Subject<Message>();

  constructor() {

    // AWS SQS configuration
    const awsConfig = {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
      region: 'dummy',
      endpoint: 'http://localhost:9324'
    };

    // Create a new instance of the SQS service
    this.squiss = new Squiss({
      awsConfig,
      queueName: 'awssqs-queue',
      bodyFormat: 'json',
      maxInFlight: 15
    });

    this.start();

  }

  // Sets an observable to receive messages from the queue
  getMessage$(): Observable<Message> {
    return this.message$.asObservable();
  }

  // Handles the message received from the queue
  onMessage(message: Message): void {
    this.message$.next(message);
    message.del();
  }

  // Starts listening to the queue
  startListening(): void {
    this.squiss.on('message', this.onMessage.bind(this));
    this.squiss.start();
  }

  // Starts the service
  async start(): Promise<void> {
    this.startListening();
  }

  // Sends a message to the queue
  async sendMessage( message: queryParams ): Promise<void> {
    await this.squiss.sendMessage(message, 0, {});
  }

}
