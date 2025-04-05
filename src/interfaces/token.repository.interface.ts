export interface ITokenRepository {
  checkUser(username: string): Promise<{username: string; password: string} | null>;
}
