import { Test, TestingModule } from '@nestjs/testing';
import { HttpIngestController } from './http-ingest.controller';
import { HttpIngestService } from './http-ingest.service';

describe('HttpIngestController', () => {
  let controller: HttpIngestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpIngestController],
      providers: [HttpIngestService],
    }).compile();

    controller = module.get<HttpIngestController>(HttpIngestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
