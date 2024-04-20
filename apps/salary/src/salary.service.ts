import { Injectable } from '@nestjs/common';

@Injectable()
export class SalaryService {
  getHello(): string {
    return 'Hello World!';
  }
}
