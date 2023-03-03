import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConversionController } from './conversion/conversion.controller';
import { AwsSqsService } from './conversion/aws-sqs.service';

@Module({
  imports: [],
  controllers: [AppController, ConversionController],
  providers: [AwsSqsService],
})
export class AppModule {}
