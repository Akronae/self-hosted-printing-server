import { Test, TestingModule } from '@nestjs/testing';
import { PrintController } from './print.controller';

describe('PrintController', () => {
  let controller: PrintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintController],
    }).compile();

    controller = module.get<PrintController>(PrintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
