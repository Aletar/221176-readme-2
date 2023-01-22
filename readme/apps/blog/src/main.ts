/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppSettings } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(AppSettings.Title)
    .setDescription(AppSettings.Description)
    .setVersion(AppSettings.Verion)
    .build();

  const globalPrefix = AppSettings.DefaultGlobalPrefix;
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(AppSettings.Swagger, app, document)

  const port = process.env.PORT || AppSettings.DefaultPort;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
