export interface ITokenService {
  checkUser(username: string): Promise<{username: string; password: string} | null>;
}
