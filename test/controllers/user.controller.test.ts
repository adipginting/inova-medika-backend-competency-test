import { expect } from "chai";
import { Request, Response } from "express";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { UserController } from "../../src/controllers/user.controller";

import { UserService } from "../../src/services/user.service";
import { UserRepository } from "../../src/repositories/user.repository";
import { mock } from "node:test";
import { IUserResponse } from "../../src/interfaces/userResponse.interface";

chai.use(sinonChai);

describe("UserController CreateUser", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: sinon.SinonStubbedInstance<UserService>;
  let mockUserRepository: sinon.SinonStubbedInstance<UserRepository>;
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
    mockUserRepository = sinon.createStubInstance(UserRepository);
    userController = new UserController(
      mockUserService as unknown as UserService,
      mockUserRepository as unknown as UserRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("User Controller", () => {
    // create user test
    it("should return a 200 status if user created", async () => {
      mockUserService.createUser.resolves(true);
      mockUserRepository.findEmail.resolves(false);
      mockUserRepository.findUsername.resolves(false);

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: true,
        message: "User was generated.",
      });
    });

    it("should return a 400 status if email already exists on create user", async () => {
      mockUserService.createUser.resolves(true);
      mockUserRepository.findEmail.resolves(true);
      mockUserRepository.findUsername.resolves(false);

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(400);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: false,
        message: "Email already exists.",
      });
    });

    it("should return a 400 status if username already exists on create user", async () => {
      mockUserService.createUser.resolves(true);
      mockUserRepository.findEmail.resolves(true);
      mockUserRepository.findUsername.resolves(true);

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(400);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: false,
        message: "Username already exists.",
      });
    });
  });
});

describe("Test UserController UpdateUser", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: sinon.SinonStubbedInstance<UserService>;
  let mockUserRepository: sinon.SinonStubbedInstance<UserRepository>;
  let userController: UserController;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: "test",
        email: "test@test.com",
        gender: "test",
        status: "test",
      },
    };
    mockResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    mockUserService = sinon.createStubInstance(UserService);
    mockUserRepository = sinon.createStubInstance(UserRepository);
    userController = new UserController(
      mockUserService as unknown as UserService,
      mockUserRepository as unknown as UserRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("User Controller", () => {
    // create user test
    it("should return a 200 status if user updated", async () => {
      mockUserService.updateUser.resolves(true);

      await userController.updateUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: true,
        message: "User was updated.",
      });
    });
  });
});

describe("Test List User", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: sinon.SinonStubbedInstance<UserService>;
  let mockUserRepository: sinon.SinonStubbedInstance<UserRepository>;
  let userController: UserController;

  beforeEach(() => {
    mockRequest = {
      params: {
        limit: "10",
        offset: "1",
      },
    };
    mockResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    mockUserService = sinon.createStubInstance(UserService);
    mockUserRepository = sinon.createStubInstance(UserRepository);
    userController = new UserController(
      mockUserService as unknown as UserService,
      mockUserRepository as unknown as UserRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("User Controller List User", () => {
    // create user test
    it("should return a 200 status if user listed", async () => {
      const mockUserResponse: IUserResponse[] = [
        {
          id: "test-1",
          username: "test1",
          name: "test",
          email: "test1@test.com",
          gender: "male",

          status: "active",
        },
        {
          id: "test-2",
          username: "test2",
          name: "test",
          email: "test2@test.com",
          gender: "male",

          status: "active",
        },
      ];
      mockUserService.listUsers.resolves(mockUserResponse);

      await userController.listUsers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: true,
        message: "Users found.",
        data: mockUserResponse,
      });
    });
  });
});

describe("Test Detail User", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: sinon.SinonStubbedInstance<UserService>;
  let mockUserRepository: sinon.SinonStubbedInstance<UserRepository>;
  let userController: UserController;

  beforeEach(() => {
    mockRequest = {
      params: {
        id: "test-1",
      },
    };
    mockResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    mockUserService = sinon.createStubInstance(UserService);
    mockUserRepository = sinon.createStubInstance(UserRepository);
    userController = new UserController(
      mockUserService as unknown as UserService,
      mockUserRepository as unknown as UserRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Detail User", () => {
    it("should return a 200 status if user found", async () => {
      const mockUserResponse: IUserResponse = {
        id: "test-1",
        username: "test1",
        name: "test",
        email: "test1@test.com",
        gender: "male",

        status: "active",
      };

      mockUserService.detailUser.resolves(mockUserResponse);

      await userController.detailUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: true,
        message: "User found.",
        data: mockUserResponse,
      });
    });
  });
});

describe("Test Delete User", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: sinon.SinonStubbedInstance<UserService>;
  let mockUserRepository: sinon.SinonStubbedInstance<UserRepository>;
  let userController: UserController;

  beforeEach(() => {
    mockRequest = {
      params: {
        id: "test-1",
      },
    };
    mockResponse = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    mockUserService = sinon.createStubInstance(UserService);
    mockUserRepository = sinon.createStubInstance(UserRepository);
    userController = new UserController(
      mockUserService as unknown as UserService,
      mockUserRepository as unknown as UserRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Delete User", () => {
    it("should return a 200 status if user deleted", async () => {
      const mockUserResponse: IUserResponse = {
        id: "test-1",
        username: "test1",
        name: "test",
        email: "test1@test.com",
        gender: "male",
        status: "active",
      };

      mockUserService.deleteUser.resolves(mockUserResponse);

      await userController.deleteUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).to.have.been.calledOnceWith(200);
      expect(mockResponse.json).to.have.been.calledOnceWith({
        success: true,
        message: "User deleted.",
        data: mockUserResponse,
      });
    });
  });
});
