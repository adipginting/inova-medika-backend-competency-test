import { expect } from "chai";
import { Request, Response } from "express";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { TokenController } from "../../src/controllers/token.controller";

import { TokenService } from "../../src/services/token.service";

chai.use(sinonChai);

describe("TokenController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockTokenService: sinon.SinonStubbedInstance<TokenService>;
  let tokenController: TokenController;

  beforeEach(() => {
    mockRequest = {
      body: { username: "", password: "" },
    };
    mockResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    mockTokenService = sinon.createStubInstance(TokenService);
    tokenController = new TokenController(
      mockTokenService as unknown as TokenService
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getToken", () => {
    it("should call tokenService.getToken", async () => {
      await tokenController.generateToken(
        mockRequest as Request,
        mockResponse as Response
      );
      expect(mockTokenService.createToken).to.have.been.calledOnceWith({
        username: "",
        password: "",
      });
    });

    it("should return a 200 status if token generated", async () => {
      mockTokenService.createToken.resolves(true);
      await tokenController.generateToken(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
  
    });
  });
});
