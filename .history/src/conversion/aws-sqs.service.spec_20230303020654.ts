import { Test, TestingModule } from '@nestjs/testing';
import { Squiss, Message } from 'squiss-ts';
import { Subject, Observable } from 'rxjs';
import { queryParams } from '../interfaces/queryParam.interface';
import { AwsSqsService } from './aws-sqs.service';

describe('AwsSqsService', () => {
  let service: AwsSqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsSqsService],
    }).compile();

    service = module.get<AwsSqsService>(AwsSqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
