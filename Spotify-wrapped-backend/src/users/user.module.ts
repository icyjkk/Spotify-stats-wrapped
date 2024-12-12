import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SpotifyApiService } from '../services/spotify-api.service';

@Module({
  controllers: [UserController],
  providers: [UserService,SpotifyApiService]
})
export class UserModule {}
