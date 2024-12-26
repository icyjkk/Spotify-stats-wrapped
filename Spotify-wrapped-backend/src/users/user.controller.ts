import { Controller, Get, Query   } from '@nestjs/common';
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
        return await this.userService.getProfile(token); // Ahora pasas el token directamente
    }

    @Get('artists')
    async getTopArtists( @Query('time_range') timeRange: string, @ExtractToken() token: string) {
        return await this.userService.getTopArtists(token,timeRange); // Ahora pasas el token directamente
    }

    @Get('tracks')
    async getTopTracks( @Query('time_range') timeRange: string, @ExtractToken() token: string) {
        return await this.userService.getTopTracks(token,timeRange); // Ahora pasas el token directamente
    }

    //test connection
    @Get()
    testConnection() {
        return this.userService.test()
    }
    
}
