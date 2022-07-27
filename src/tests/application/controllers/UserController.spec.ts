import { UserController } from "@application/controllers/UserController";
import { UserService } from "@domain/service/UserService";
import { mock } from "jest-mock-extended";

describe("UserController", () => {

    it("Should login user", async () => {

        const userServiceMock = mock<UserService>();

        const userController = new UserController(userServiceMock);

        const user = { id: "id", cpf: "cpf" };

        userServiceMock.login.mockResolvedValueOnce(user);

        const authentication = await userController.loginUser(user.cpf);

        expect(userServiceMock.login).toBeCalledTimes(1);
        expect(userServiceMock.login).toBeCalledWith(user.cpf);

        expect(authentication).toBe(user.id);

    });
});