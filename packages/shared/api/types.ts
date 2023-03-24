export type UserAuthorization = {
  accessToken: string;
  accessTokenExpirationDate: string | number;
  refreshToken: string | undefined;
};
