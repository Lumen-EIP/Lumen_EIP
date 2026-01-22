import { Test, TestingModule } from '@nestjs/testing';
import { HttpIngestService } from './http-ingest.service';

describe('HttpIngestService', () => {
  let service: HttpIngestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpIngestService],
    }).compile();

    service = module.get<HttpIngestService>(HttpIngestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
