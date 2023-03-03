import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getConversion(): string {
    return { status: true, message: 'Conversion successful' };
  }
}
