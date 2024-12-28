import { HttpException, HttpStatus } from '@nestjs/common';

export class SpotifyApiService {
  private readonly baseUrl = 'https://api.spotify.com/v1';

  // Método principal para realizar solicitudes
  async makeRequest(endpoint: string, token: string, method = 'GET') {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      this.handleSpotifyApiError(response, error); // Manejo de errores
    }

    return response.json();
  }

  // Método privado para manejar errores de Spotify
  private handleSpotifyApiError(response: Response, error: any) {
    console.error('Error al obtener datos de la API de Spotify:', error);

    if (response.status === 401) {
      throw new HttpException(
        {
          statusCode: 401,
          message:
            'Token inválido o expirado. Por favor, autentíquese nuevamente.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else if (response.status === 403) {
      throw new HttpException(
        {
          statusCode: 403,
          message: 'Acceso denegado. No tiene permisos para esta acción.',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      throw new HttpException(
        {
          statusCode: response.status,
          message: `Error en Spotify API: ${response.statusText}`,
          details: error,
        },
        response.status,
      );
    }
  }
}
