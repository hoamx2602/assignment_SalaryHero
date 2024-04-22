import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    cors: true
  });
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle(`${process.env.APP_NAME} API`)
      .setDescription('The apis for auth app')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(Number(configService.get('PORT')));
}
bootstrap();
