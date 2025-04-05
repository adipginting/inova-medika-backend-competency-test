import { expect } from "chai";
import { Request, Response } from "express";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { UserController } from "../../src/controllers/user.controller";

import { UserService } from "../../src/services/user.service";

chai.use(sinonChai);

describe("UserController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: sinon.SinonStubbedInstance<UserService>;
  let userController: UserController;

  beforeEach(() => {
    mockRequest = {
      body: {
        username: "test",
        name: "test",
        email: "test2@test.com",
        gender: "test",
        password: "test",
        status: "test",
      },
    };
    mockResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    mockUserService = sinon.createStubInstance(UserService);
    userController = new UserController(
      mockUserService as unknown as UserService
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getUser", () => {
    it("should call userService.getUser", async () => {
      await userController.generateUser(
        mockRequest as Request,
        mockResponse as Response
      );
      expect(mockUserService.createUser).to.have.been.calledOnceWith({
        username: "test",
        name: "test",
        email: "test2@test.com",
        gender: "test",
        password: "test",
        status: "test",
      });
    });

    it("should return a 200 status if user generated", async () => {
      mockUserService.createUser.resolves(true);
      await userController.generateUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: true,
        message: "User was generated.",
      });
    });
  });
});
