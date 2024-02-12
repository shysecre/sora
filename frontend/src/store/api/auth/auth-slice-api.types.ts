export interface GetAuthLinkResponse {
  link: string
  state: string
}

export interface AuthUserWithCodeOptions {
  code: string
}

export interface AuthUserWithCodeResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshUserAccessTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface GetAuthLinkOptions {
  lng: string
}

export interface VerifyTokenResponse {
  isExpired: boolean
}
