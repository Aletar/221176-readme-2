/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import {SERVICE_TITLE, SERVICE_DESCRIPTION, SERVICE_VERSION, DEFAULT_GLOBAL_PREFIX, DEFAULT_PORT, DEFAULT_SWAGGER} from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = DEFAULT_GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle(SERVICE_TITLE)
    .setDescription(SERVICE_DESCRIPTION)
    .setVersion(SERVICE_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DEFAULT_SWAGGER, app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
