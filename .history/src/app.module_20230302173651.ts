import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConversionController } from './conversion/conversion.controller';

@Module({
  imports: [],
  controllers: [AppController, ConversionController],
  providers: [],
})
export class AppModule {}
