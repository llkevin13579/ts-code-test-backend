import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * @description Init nest swagger API spec
 */
const initSwaggerSpec = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Todo API Spec')
    .setDescription('Todo API Specification')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

/**
 * @description Create nest application
 */
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  initSwaggerSpec(app);
  await app.listen(3000);
}

bootstrap();
