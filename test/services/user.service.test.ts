import { expect } from "chai";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { UserService } from "../../src/services/user.service";
import { UserRepository } from "../../src/repositories/user.repository";
import { UserDTO } from "../../src/dtos/user.dto";

chai.use(sinonChai);

describe("UserRepository", () => {
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

    it("should return true if user generated", async () => {
      mockUserRepository.createUser.resolves(true);

      const result = await userService.createUser(mockUserDto);
      expect(result).to.be.true;
    });

    it("should return true if user updated", async () => {
      mockUserRepository.updateUser.resolves(true);
      const result = await userService.updateUser(mockUserDto);
      expect(result).to.be.true;
    });
  });
});
