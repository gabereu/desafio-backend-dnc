import { mock } from 'jest-mock-extended';
import Administrator from '../../../main/domain/models/Administrator';
import { AdministratorRepository } from '../../../main/domain/repository/AdministratorRepository';
import { AdministratorService } from '../../../main/domain/service/AdministratorService';

const fakeAdmin = () => ({ id: '0', username: 'username' } as Administrator);

describe("UserService", () => {

    it("Should correct login an already created user", async () => {
        const administratorRepositoryMock = mock<AdministratorRepository>();

        const administratorService = new AdministratorService(administratorRepositoryMock);

        administratorRepositoryMock.findByUsername.mockResolvedValueOnce(fakeAdmin());

        const loggedUser = await administratorService.login("cpf");

        expect(administratorRepositoryMock.findByUsername).toHaveBeenCalledTimes(1);
        expect(administratorRepositoryMock.save).toHaveBeenCalledTimes(0);

        expect(loggedUser).toStrictEqual(fakeAdmin());

    });

    it("Should correct login a not already created user", async () => {
        const administratorRepositoryMock = mock<AdministratorRepository>();

        const administratorService = new AdministratorService(administratorRepositoryMock);

        administratorRepositoryMock.findByUsername.mockResolvedValueOnce(null);
        administratorRepositoryMock.save.mockResolvedValueOnce(fakeAdmin());

        const loggedUser = await administratorService.login("username");

        expect(administratorRepositoryMock.findByUsername).toHaveBeenCalledTimes(1);
        expect(administratorRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(administratorRepositoryMock.save).toHaveBeenCalledWith({ username: fakeAdmin().username });

        expect(loggedUser).toStrictEqual(fakeAdmin());

    });

});