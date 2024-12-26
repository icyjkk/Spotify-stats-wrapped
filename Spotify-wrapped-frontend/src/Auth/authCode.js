const backendUrl = import.meta.env.VITE_BACKEND_URL 

export async function getAccessToken(code,codeVerifier) {
    const response = await fetch(`${backendUrl}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, codeVerifier }),
    });

    const data = await response.json();
    return data
}

export async function redirectToSpotify() {
    console.log(backendUrl)
    const codeVerifier = generateCodeVerifier(128);
    sessionStorage.setItem('codeVerifier', codeVerifier); // Guarda el codeVerifier para usarlo después

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const response = await fetch(`${backendUrl}/auth/url`);
    const { url } = await response.json();

    window.location.href = `${url}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
}

// Genera un code verifier aleatorio
function generateCodeVerifier(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres válidos

    // Genera un string aleatorio de la longitud especificada
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Convierte el code verifier en un code challenge usando SHA-256
async function generateCodeChallenge(codeVerifier) {
    // Convierte el code verifier en un array de bytes
    const data = new TextEncoder().encode(codeVerifier);
    // Calcula el hash SHA-256 del code verifier
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    // Convierte el hash en base64 URL-safe y elimina caracteres de relleno
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-') // Reemplaza '+' por '-'
        .replace(/\//g, '_') // Reemplaza '/' por '_'
        .replace(/=+$/, ''); // Elimina los caracteres '='
}
