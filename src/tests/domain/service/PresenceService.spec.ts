import { PresenceService } from '../../../main/domain/service/PresenceService';
import { mock } from 'jest-mock-extended';
import { PresenceRepository } from '../../../main/domain/repository/PresenceRepository';
import { User } from '../../../main/domain/models/User';

const fakeDate = new Date(2022, 1, 1);
const fakeDate2 = new Date(2022, 1, 2);

const fakeUser = () => ({ id: '0', cpf: 'cpf' } as User);

describe("PresenceService", () => {

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(fakeDate);
    });
    
    afterAll(() => {
        jest.useRealTimers();
    });

    it("Should call presenceRepository.save once with correct values in presenceService.registerPresence", async () => {
        const presenceRepositoryMock = mock<PresenceRepository>();

        const presenceService = new PresenceService(presenceRepositoryMock);

        await presenceService.registerPresence(fakeUser());

        expect(presenceRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.save).toHaveBeenCalledWith({
            user: fakeUser(),
            date: fakeDate
        });

        presenceRepositoryMock.save.mockClear()

        await presenceService.registerPresence(fakeUser(), fakeDate2);

        expect(presenceRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.save).toHaveBeenCalledWith({
            user: fakeUser(),
            date: fakeDate2
        });

    });

    it("Should call presenceRepository.save once with correct values in presenceService.changePresenceDate", async () => {
        const presenceRepositoryMock = mock<PresenceRepository>();

        const presenceService = new PresenceService(presenceRepositoryMock);

        await presenceService.changePresenceDate({ id: '0', user: fakeUser(), date: fakeDate }, fakeDate2);

        expect(presenceRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.save).toHaveBeenCalledWith({
            id: '0',
            user: fakeUser(),
            date: fakeDate2
        });

    });

    it("Should call presenceRepository.delete once with correct values in presenceService.deletePresence", async () => {
        const presenceRepositoryMock = mock<PresenceRepository>();

        const presenceService = new PresenceService(presenceRepositoryMock);

        await presenceService.deletePresence({ id: '0', user: fakeUser(), date: fakeDate });

        expect(presenceRepositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.delete).toHaveBeenCalledWith({
            id: '0',
            user: fakeUser(),
            date: fakeDate
        });

    });

});