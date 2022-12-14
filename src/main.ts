import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 白名单，去除DTO以外的无效属性
      forbidNonWhitelisted: true, // 让DTO以外的无效属性抛出异常
      transform: true, // DTO转化为实例或自动转化类型，例如:string => number
      transformOptions: {
        enableImplicitConversion: true, // 在全局层面上启用隐式类型转换，此设置就可以不用@Type了
      },
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
