import { expect } from "chai";
import { UserDTO } from "../../src/dtos/user.dto";
import { validateUpdateUser } from "../../src/utils/validate-update-user.util";

describe("test utils/validate-update-user.util.ts", () => {
  it("should throw an error if email is empty", () => {
    const userDto: UserDTO = {
      name: "test",
      email: "",
      gender: "test",
    };
    expect(() => validateUpdateUser(userDto)).to.throw("Email is required");
  });

  it("should throw an error if name is empty", () => {
    const userDto: UserDTO = {
      name: "",
      email: "test",
      gender: "test",
    };
    expect(() => validateUpdateUser(userDto)).to.throw("Name is required");
  });

  it("should throw an error if password is empty", () => {
    const userDto: UserDTO = {
      name: "test",
      email: "test",
      gender: "",
    };

    expect(() => validateUpdateUser(userDto)).to.throw("Gender is required");
  });
});
