/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {SERVICE_TITLE, SERVICE_DESCRIPTION, SERVICE_VERSION, DEFAULT_PORT, DEFAULT_GLOBAL_PREFIX, DEFAULT_SWAGGER} from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(SERVICE_TITLE)
    .setDescription(SERVICE_DESCRIPTION)
    .setVersion(SERVICE_VERSION)
    .build();

  const globalPrefix = DEFAULT_GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DEFAULT_SWAGGER, app, document)

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
