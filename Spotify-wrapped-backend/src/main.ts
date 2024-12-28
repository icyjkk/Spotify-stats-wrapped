import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // Import dotenv
import * as cors from 'cors'; // Import cors

dotenv.config(); // Load variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS con la librería cors
  app.use(
    cors({
      origin: process.env.FRONTEND_URI || '*', // Cambiar '*' a la URL específica en producción
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
      credentials: true, // Si necesitas enviar cookies o datos de autenticación
    }),
  );

  console.log(`CORS enabled for origin: ${process.env.FRONTEND_URI}`);

  // Inicia la aplicación
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
