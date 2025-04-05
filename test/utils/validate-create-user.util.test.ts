import { expect } from "chai";
import { UserDTO } from "../../src/dtos/user.dto";
import { validateCreateUser } from "../../src/utils/validate-create-user.util";

describe("test utils/validate-create-user.util.ts", () => {
  it("should throw an error if username is empty", () => {
    const userDto: UserDTO = {
      username: "",
      name: "test",
      email: "test",
      gender: "test",
      password: "test",
    };
    expect(() => validateCreateUser(userDto)).to.throw("Username is required");
  });

  it("should throw an error if name is empty", () => {
    const userDto: UserDTO = {
      username: "test",
      name: "",
      email: "test",
      gender: "test",
      password: "test",
    };
    expect(() => validateCreateUser(userDto)).to.throw("Name is required");
  });

  it("should throw an error if password is empty", () => {
    const userDto: UserDTO = {
      username: "test",
      name: "test",
      email: "test",
      gender: "test",
      password: "",
    };
    expect(() => validateCreateUser(userDto)).to.throw("Password is required");
  });

  it("should throw an error if gender is empty", () => {
    const userDto: UserDTO = {
      username: "test",
      name: "test",
      email: "test",
      gender: "",
      password: "test",
    };
    expect(() => validateCreateUser(userDto)).to.throw("Gender is required");
  });
});
