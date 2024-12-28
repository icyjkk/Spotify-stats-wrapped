import { Injectable } from '@nestjs/common';
import { SpotifyApiService } from '../services/spotify-api.service';

@Injectable()
export class UserService {
  constructor(private readonly spotifyApiService: SpotifyApiService) {}

  test() {
    console.log('test');
    return 'This is a test service!';
  }

  async getProfile(token) {
    return await this.spotifyApiService.makeRequest('/me', token);
  }

  async getTopArtists(token, timeRange) {
    return await this.spotifyApiService.makeRequest(
      `/me/top/artists?time_range=${timeRange}&limit=50&offset=0`,
      token,
    );
  }

  async getTopTracks(token, timeRange) {
    return await this.spotifyApiService.makeRequest(
      `/me/top/tracks?time_range=${timeRange}&limit=50&offset=0`,
      token,
    );
  }
}
