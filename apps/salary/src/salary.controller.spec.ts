import { Test, TestingModule } from '@nestjs/testing';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';

describe('SalaryController', () => {
  let salaryController: SalaryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SalaryController],
      providers: [SalaryService],
    }).compile();

    salaryController = app.get<SalaryController>(SalaryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(salaryController.getHello()).toBe('Hello World!');
    });
  });
});
