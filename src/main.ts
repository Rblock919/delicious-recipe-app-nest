import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
// import { AppHeaderSecurity } from './helmet.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // TODO: uncomment security headers once tailored for gql dev purposes
  // AppHeaderSecurity(app);
  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
