import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversionController } from './conversion/conversion.controller';
import { ConversionService } from './conversion/conversion.service';

@Module({
  imports: [],
  controllers: [AppController, ConversionController],
  providers: [AppService, ConversionService],
})
export class AppModule {}
