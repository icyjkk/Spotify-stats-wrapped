import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { SpotifyApiService } from '../services/spotify-api.service';


@Injectable()
export class UserService {

    constructor(private readonly spotifyApiService: SpotifyApiService) {}

    test() {
        return 'This is a test service!'
    }

    async getProfile(token) {
        return await this.spotifyApiService.makeRequest('/me', token);
    }
}
