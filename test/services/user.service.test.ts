import { expect } from "chai";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { UserService } from "../../src/services/user.service";
import { UserRepository } from "../../src/repositories/user.repository";
import { UserDTO } from "../../src/dtos/user.dto";
import { IUserResponse } from "../../src/interfaces/userResponse.interface";

chai.use(sinonChai);

describe("User Service", () => {
  let mockUserDto: UserDTO;

  let mockUserRepository: sinon.SinonStubbedInstance<UserRepository>;
  let userService: UserService;

  beforeEach(() => {
    mockUserDto = {
      username: "test",
      name: "test",
      email: "test",
      gender: "male",
      password: "test",
      status: "active",
    };

    mockUserRepository = sinon.createStubInstance(UserRepository);
    userService = new UserService(
      mockUserRepository as unknown as UserRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("User tests", () => {
    it("should call UserRepository.getUser", async () => {
      mockUserRepository.createUser.resolves(true);

      await userService.createUser(mockUserDto);
      expect(mockUserRepository.createUser).to.have.been.calledOnceWith(
        mockUserDto
      );
    });

    it("should return true if user created", async () => {
      mockUserRepository.createUser.resolves(true);

      const result = await userService.createUser(mockUserDto);
      expect(result).to.be.true;
    });

    it("should return true if user updated", async () => {
      mockUserRepository.updateUser.resolves(true);
      const result = await userService.updateUser(mockUserDto);
      expect(result).to.be.true;
    });

    it("should list users", async () => {
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

      mockUserRepository.listUsers.resolves(mockUserResponse);
      const result = await userService.listUsers(2, 0);
      expect(result).to.be.deep.equal(mockUserResponse);
      expect(mockUserRepository.listUsers).to.have.been.calledOnceWith(2, 0);
    });

    it("should return user", async () => {
      const mockUserResponse: IUserResponse = {
        id: "test-1",
        username: "test1",
        name: "test",
        email: "test1@test.com",
        gender: "male",
        status: "active",
      };

      mockUserRepository.detailUser.resolves(mockUserResponse);
      const result = await userService.detailUser("test-1");
      expect(result).to.be.deep.equal(mockUserResponse);
      expect(mockUserRepository.detailUser).to.have.been.calledOnceWith("test-1");
    });
  });
});
