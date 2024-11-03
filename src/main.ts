import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { transport: Transport.TCP, options: { port: 3002, host: '0.0.0.0' } },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(
          errors.map(({ property, constraints }) => ({
            property,
            errors: Object.values(constraints!),
          })),
        ),
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();
}
bootstrap();
