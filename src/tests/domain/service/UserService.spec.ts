import { mock } from 'jest-mock-extended';
import { User } from '../../../main/domain/models/User';
import { UserRepository } from '../../../main/domain/repository/UserRepository';
import { UserService } from '../../../main/domain/service/UserService';

const fakeUser = () => ({ id: '0', cpf: 'cpf' } as User);

describe("UserService", () => {

    it("Should correct login an already created user", async () => {
        const userRepositoryMock = mock<UserRepository>();

        const userService = new UserService(userRepositoryMock);

        userRepositoryMock.findByCpf.mockResolvedValueOnce(fakeUser());

        const loggedUser = await userService.login("cpf");

        expect(userRepositoryMock.findByCpf).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.save).toHaveBeenCalledTimes(0);

        expect(loggedUser).toStrictEqual(fakeUser());

    });

    it("Should correct login a not already created user", async () => {
        const userRepositoryMock = mock<UserRepository>();

        const userService = new UserService(userRepositoryMock);

        userRepositoryMock.findByCpf.mockResolvedValueOnce(null);
        userRepositoryMock.save.mockResolvedValueOnce(fakeUser());

        const loggedUser = await userService.login("cpf");

        expect(userRepositoryMock.findByCpf).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.save).toHaveBeenCalledWith({ cpf: fakeUser().cpf });

        expect(loggedUser).toStrictEqual(fakeUser());

    });

});