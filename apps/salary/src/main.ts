import { NestFactory } from '@nestjs/core';
import { SalaryModule } from './salary.module';

async function bootstrap() {
  const app = await NestFactory.create(SalaryModule);
  await app.listen(3000);
}
bootstrap();
