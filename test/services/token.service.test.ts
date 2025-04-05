import { expect } from "chai";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { TokenService } from "../../src/services/token.service";
import { TokenRepository } from "../../src/repositories/token.repository";
import { IToken } from "../../src/interfaces/token.interface";
import * as argon2 from "argon2";

chai.use(sinonChai);

describe("TokenRepository", () => {
  let mockCred: IToken;

  let mockTokenRepository: sinon.SinonStubbedInstance<TokenRepository>;
  let tokenService: TokenService;

  beforeEach(() => {
    mockCred = {
      username: "test",
      password: "test",
    };
 

    mockTokenRepository = sinon.createStubInstance(TokenRepository);
    tokenService = new TokenService(
      mockTokenRepository as unknown as TokenRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Check username and password.", () => {
    it("should call TokenRepository.getToken", async () => {
      mockTokenRepository.checkUser.resolves({
        username: "test",
        password: await argon2.hash(mockCred.password),
      });

      await tokenService.createToken(mockCred);
      expect(mockTokenRepository.checkUser).to.have.been.calledOnceWith(
        mockCred.username
      );
    });

    it("should return boolean if token generated", async () => {
      mockTokenRepository.checkUser.resolves({
        username: "test",
        password: await argon2.hash(mockCred.password),
      });

      const result = await tokenService.createToken(mockCred);

      expect(result).to.be.true;
    });
  });
});
