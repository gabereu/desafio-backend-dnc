import { AdministratorController } from "@application/controllers/AdministratorController";
import { AdministratorService } from "@domain/service/AdministratorService";
import { mock } from "jest-mock-extended";

describe("AdministratorController", () => {

    it("Should login admin", async () => {

        const administratorServiceMock = mock<AdministratorService>();

        const administratorController = new AdministratorController(administratorServiceMock);

        const admin = { id: "id", username: "username" };

        administratorServiceMock.login.mockResolvedValueOnce(admin);

        const authentication = await administratorController.loginAdministrator(admin.username);

        expect(administratorServiceMock.login).toBeCalledTimes(1);
        expect(administratorServiceMock.login).toBeCalledWith(admin.username);

        expect(authentication).toBe(admin.id);

    });
});