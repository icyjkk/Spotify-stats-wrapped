import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    private clientId = process.env.CLIENT_ID;
    private clientSecret = process.env.CLIENT_SECRET;
    private redirectUri = process.env.REDIRECT_URI;

    generateAuthUrl(){
        const params = new URLSearchParams({
            client_id: this.clientId,
            response_type: 'code',
            redirect_uri: this.redirectUri,
            scope: 'user-read-private user-read-email',
        });


        return { url: `https://accounts.spotify.com/authorize?${params.toString()}` };
    }

    async exchangeCodeForToken(code, codeVerifier) {

        console.log(code)
        console.log("verifier: ", codeVerifier)

        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.redirectUri,
            code_verifier: codeVerifier,
        });
    
        const authHeader = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${authHeader}`,
                },
                body: params.toString(),
            });
    
            if (!response.ok) {
                throw new Error(`Error al obtener el token: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            return data; // Devuelve el token y otros datos relevantes
        } catch (error) {
            console.error('Error al intercambiar el código por un token:', error.message);
            throw new Error('No se pudo obtener el token de acceso');
        }
    }

    test() {
        return 'This is a test service!'
    }
}
