import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Aqui en un futuro se pondría la URL del frontend, esto es para que solo nuestro frontend pueda hacerle peticiones a nuestro backend.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  console.log(`CORS enabled for origin: ${process.env.FRONTEND_URI}`);

  // Inicia la aplicación
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
