export const oktaConfig = {
    clientId: '0oadboi9aapAZ3GI65d7',
    issuer: 'https://dev-69245132.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}