import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    // creamos un objeto de la clase service.
    // NestJS automáticamente crea una instancia de AuthService y la pasa al constructor de AuthController cuando se
    // crea una instancia de AuthController. Esto se conoce como inyección de dependencias.
    constructor(private authService: AuthService) { }

    // Generar la URL de autorización
    @Get('url')
    getAuthUrl(){
      return this.authService.generateAuthUrl();
    }

    // Intercambiar el código por un token
    @Post('token')
    async exchangeCodeForToken(@Body() params: any) {
        return this.authService.exchangeCodeForToken(params.code, params.codeVerifier);
    }

    //test connection
    @Get()
    testConnection() {
        return this.authService.test()
    }
    
}
