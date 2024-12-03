import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // Para poder usar las validaciones.

  // Habilitar CORS para que nuestro frontend pueda hacer peticiones a nuestro backend.
  app.enableCors({
    origin: '*', // Aqui en un futuro se pondría la URL del frontend, esto es para que solo nuestro frontend pueda hacerle peticiones a nuestro backend.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true, // Si la aplicación necesita enviar cookies u otros datos de autenticación.
  })
  app.enableCors();
  
  await app.listen(process.env.PORT)
}

bootstrap()
