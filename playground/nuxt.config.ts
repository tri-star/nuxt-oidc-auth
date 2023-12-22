import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '../src/module',
    '@nuxt/ui'
  ],
  oidc: {
    defaultProvider: 'github',
    providers: {
      entra: {
        redirectUri: 'http://localhost:3000/auth/entra/callback',
        clientId: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        authorizationUrl: 'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize',
        tokenUrl: 'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token',
        userNameClaim: 'name',
        nonce: true,
        responseType: 'code id_token',
        scope: ['profile', 'openid', 'offline_access', 'email'],
        logoutUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/logout',
        optionalClaims: ['preferred_username', 'email']
      },
      auth0: {
        audience: 'test-api-oidc',
        responseType: 'code',
        redirectUri: 'http://localhost:3000/auth/auth0/callback',
        baseUrl: 'BASE_URL',
        clientId: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        scope: ['offline_access', 'profile', 'email'],
        additionalTokenParameters: {
          audience: 'test-api-oidc'
        },
        additionalAuthParameters: {
          audience: 'test-api-oidc'
        }
      },
      github: {
        redirectUri: 'http://localhost:3000/auth/github/callback',
        clientId: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        filterUserinfo: ['login', 'id', 'avatar_url', 'name', 'email'],
      }
    },
    session: {
      expirationCheck: true,
      automaticRefresh: true,
    }
  },
  devtools: { enabled: true },
  imports: {
    autoImport: true
  },
  nitro: {
    storage: { // User different driver for persistant storage
      oidc: {
        driver: 'memory'
      }
    }
  }
})
