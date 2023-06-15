import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  if (!process.env.NODE_ENV) {
    const config = new DocumentBuilder()
      .setTitle('Sora API')
      .setVersion('0.1')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(5001);
}

bootstrap();
