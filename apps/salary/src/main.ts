import { NestFactory } from '@nestjs/core';
import { SalaryModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(SalaryModule);
  await app.listen(3005);
}
bootstrap();
