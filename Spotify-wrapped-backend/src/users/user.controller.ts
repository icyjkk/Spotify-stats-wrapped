import { Controller, Get, Req,UnauthorizedException  } from '@nestjs/common';
import { UserService } from './user.service'
import { ExtractToken } from '../decorators/decorators.decorator';

@Controller('user')
export class UserController {

    // creamos un objeto de la clase service.
    // NestJS automáticamente crea una instancia de AuthService y la pasa al constructor de AuthController cuando se
    // crea una instancia de AuthController. Esto se conoce como inyección de dependencias.
    constructor(private userService: UserService) { }

    // Obtener el perfil
    @Get('profile')
    async getProfile(@ExtractToken() token: string) {
        console.log('Token:', token);
        return await this.userService.getProfile(token); // Ahora pasas el token directamente
    }

    //test connection
    @Get()
    testConnection() {
        return this.userService.test()
    }
    
}
