import { PresenceController } from "@application/controllers/PresenceController";
import { Administrator } from "@domain/models/Administrator";
import { Presence } from "@domain/models/Presence";
import { User } from "@domain/models/User";
import { AdministratorRepository } from "@domain/repository/AdministratorRepository";
import { PresenceRepository } from "@domain/repository/PresenceRepository";
import { UserRepository } from "@domain/repository/UserRepository";
import { PresenceService } from "@domain/service/PresenceService";
import { mock } from "jest-mock-extended";

describe("PresenceController", () => {

    const administratorControllerFactory = () => {
        const presenceServiceMock = mock<PresenceService>();
        const presenceRepositoryMock = mock<PresenceRepository>();
        const userRepositoryMock = mock<UserRepository>();
        const administratorRepositoryMock = mock<AdministratorRepository>();

        const presenceController = new PresenceController(
            presenceServiceMock,
            presenceRepositoryMock,
            userRepositoryMock,
            administratorRepositoryMock
        );

        return {
            presenceServiceMock,
            presenceRepositoryMock,
            userRepositoryMock,
            administratorRepositoryMock,
            presenceController
        }
    }

    it("Should register presence from user", async () => {

        const { 
            presenceController,
            userRepositoryMock,
            presenceServiceMock,
        } = administratorControllerFactory();

        const user = { id: "id", cpf: "cpf" } as User;
        const presence = { id: "id", user, date: new Date(2022, 1,1) } as Presence;

        userRepositoryMock.findById.mockResolvedValueOnce(user);
        presenceServiceMock.registerPresence.mockResolvedValueOnce(presence);

        const registeredPresence = await presenceController.registerPresenceFromUser(user.id);

        expect(userRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith(user.id);

        expect(presenceServiceMock.registerPresence).toHaveBeenCalledTimes(1);
        expect(presenceServiceMock.registerPresence).toHaveBeenCalledWith(user);

        expect(registeredPresence).toStrictEqual(presence);
    });

    it("Should not register presence from unregistered user", async () => {

        const { 
            presenceController,
            userRepositoryMock,
        } = administratorControllerFactory();

        userRepositoryMock.findById.mockResolvedValueOnce(null);

        await expect(presenceController.registerPresenceFromUser("id")).rejects.toThrow("User not founded");

    });

    it("Should register presence from user by admin", async () => {

        const { 
            presenceController,
            userRepositoryMock,
            presenceServiceMock,
            administratorRepositoryMock,
        } = administratorControllerFactory();

        const user = { id: "user", cpf: "cpf" } as User;
        const administrator = { id: "admin", username: "username" } as Administrator;
        const presence = { id: "presence", user, date: new Date(2022, 1,1) } as Presence;

        userRepositoryMock.findById.mockResolvedValueOnce(user);
        administratorRepositoryMock.findById.mockResolvedValueOnce(administrator);
        presenceServiceMock.registerPresence.mockResolvedValueOnce(presence);

        const registeredPresence = await presenceController.registerPresenceFromUserByAdmin(user.id, presence.date, administrator.id);

        expect(userRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith(user.id);

        expect(presenceServiceMock.registerPresence).toHaveBeenCalledTimes(1);
        expect(presenceServiceMock.registerPresence).toHaveBeenCalledWith(user, presence.date);

        expect(registeredPresence).toStrictEqual(presence);
    });

    it("Should not register presence from user by admin if used wrong values", async () => {

        const { 
            presenceController,
            userRepositoryMock,
            administratorRepositoryMock,
        } = administratorControllerFactory();

        const user = { id: "user", cpf: "cpf" } as User;
        const administrator = { id: "admin", username: "username" } as Administrator;
        const presence = { id: "presence", user, date: new Date(2022, 1,1) } as Presence;

        userRepositoryMock.findById.mockResolvedValueOnce(user);
        administratorRepositoryMock.findById.mockResolvedValueOnce(administrator);

        await expect(
            presenceController.registerPresenceFromUserByAdmin(user.id, null as unknown as Date, administrator.id)
        ).rejects.toThrow("Date must not be null");

        userRepositoryMock.findById.mockResolvedValueOnce(null);
        administratorRepositoryMock.findById.mockResolvedValueOnce(administrator);

        await expect(
            presenceController.registerPresenceFromUserByAdmin(user.id, presence.date, administrator.id)
        ).rejects.toThrow("User not founded");

        administratorRepositoryMock.findById.mockResolvedValueOnce(null);

        await expect(
            presenceController.registerPresenceFromUserByAdmin(user.id, presence.date, administrator.id)
        ).rejects.toThrow("Not authenticated");

    });

    it("Should return all presences by user", async () => {

        const { 
            presenceController,
            userRepositoryMock,
            presenceRepositoryMock,
        } = administratorControllerFactory();

        const user = { id: "id", cpf: "cpf" } as User;
        const presence = { id: "id", user, date: new Date(2022,1,1) } as Presence;
        const presence2 = { id: "id", user, date: new Date(2022,1,3) } as Presence;

        const fromDate = new Date(2022,1,1);
        const toDate = new Date(2022,1,2);

        userRepositoryMock.findById.mockResolvedValue(user);
        presenceRepositoryMock.findByUser.mockResolvedValueOnce([presence, presence2]);
        presenceRepositoryMock.findByUserBetweenDates.mockResolvedValueOnce([presence]);
        
        
        const presences = await presenceController.findByUser({ userId: user.id });

        const presences2 = await presenceController.findByUser({ userId: user.id, fromDate, toDate });

        expect(userRepositoryMock.findById).toHaveBeenCalledTimes(2);
        expect(userRepositoryMock.findById).toHaveBeenNthCalledWith(1, user.id);
        expect(userRepositoryMock.findById).toHaveBeenNthCalledWith(2, user.id);

        expect(presenceRepositoryMock.findByUser).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.findByUser).toHaveBeenCalledWith(user);
        
        expect(presenceRepositoryMock.findByUserBetweenDates).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.findByUserBetweenDates).toHaveBeenCalledWith(user, fromDate, toDate);

        expect(presences).toStrictEqual([presence, presence2]);
        expect(presences2).toStrictEqual([presence]);
    });

    it("Should not return all presences by user if used wrong values", async () => {

        const { 
            presenceController,
            userRepositoryMock,
        } = administratorControllerFactory();

        const user = { id: "id", cpf: "cpf" } as User;

        const fromDate = new Date(2022,1,1);
        const toDate = new Date(2022,1,2);

        userRepositoryMock.findById.mockResolvedValueOnce(null);
        
        await expect(
            presenceController.findByUser({ userId: user.id })
        ).rejects.toThrow("User not founded");

        await expect(
            presenceController.findByUser({ userId: user.id, fromDate })
        ).rejects.toThrow("You must provide fromDate and toDate, or none of both");

        await expect(
            presenceController.findByUser({ userId: user.id, toDate })
        ).rejects.toThrow("You must provide fromDate and toDate, or none of both");
    });

    it("Should return all presences from all users to admin", async () => {

        const { 
            presenceController,
            presenceRepositoryMock,
            administratorRepositoryMock
        } = administratorControllerFactory();

        const admin = { id: "admin", username: "username" } as Administrator;

        const user = { id: "id", cpf: "cpf" } as User;
        const user2 = { id: "id2", cpf: "cpf2" } as User;

        const presence = { id: "id", user, date: new Date(2022,1,1) } as Presence;
        const presence2 = { id: "id", user: user2, date: new Date(2022,1,3) } as Presence;

        const fromDate = new Date(2022,1,1);
        const toDate = new Date(2022,1,2);

        administratorRepositoryMock.findById.mockResolvedValue(admin);
        presenceRepositoryMock.findAll.mockResolvedValueOnce([presence, presence2]);
        presenceRepositoryMock.findAllBetweenDates.mockResolvedValueOnce([presence]);
        
        const presences = await presenceController.findAll({ adminId: admin.id });

        const presences2 = await presenceController.findAll({ adminId: admin.id, fromDate, toDate });

        expect(administratorRepositoryMock.findById).toHaveBeenCalledTimes(2);
        expect(administratorRepositoryMock.findById).toHaveBeenNthCalledWith(1, admin.id);
        expect(administratorRepositoryMock.findById).toHaveBeenNthCalledWith(2, admin.id);

        expect(presenceRepositoryMock.findAll).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.findAll).toHaveBeenCalledWith();
        
        expect(presenceRepositoryMock.findAllBetweenDates).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.findAllBetweenDates).toHaveBeenCalledWith(fromDate, toDate);

        expect(presences).toStrictEqual([presence, presence2]);
        expect(presences2).toStrictEqual([presence]);
    });

    it("Should not return all presences to admin if used wrong values", async () => {

        const { 
            presenceController,
            userRepositoryMock,
        } = administratorControllerFactory();

        const admin = { id: "admin", username: "username" } as Administrator;

        const fromDate = new Date(2022,1,1);
        const toDate = new Date(2022,1,2);

        userRepositoryMock.findById.mockResolvedValueOnce(null);
        
        await expect(
            presenceController.findAll({ adminId: admin.id })
        ).rejects.toThrow("Administrator not founded");

        await expect(
            presenceController.findAll({ adminId: admin.id, fromDate })
        ).rejects.toThrow("You must provide fromDate and toDate, or none of both");

        await expect(
            presenceController.findAll({ adminId: admin.id, toDate })
        ).rejects.toThrow("You must provide fromDate and toDate, or none of both");
    });

    it("Should change presence", async () => {

        const { 
            presenceController,
            presenceRepositoryMock,
            presenceServiceMock,
            administratorRepositoryMock
        } = administratorControllerFactory();

        const admin = { id: "admin", username: "username" } as Administrator;

        const user = { id: "id", cpf: "cpf" } as User;

        const presence = { id: "id", user, date: new Date(2022,1,1) } as Presence;

        administratorRepositoryMock.findById.mockResolvedValueOnce(admin);
        presenceRepositoryMock.findById.mockResolvedValueOnce(presence);
        presenceServiceMock.changePresenceDate.mockResolvedValueOnce({ ...presence, date: new Date(2022,1,3) })

        const updated = await presenceController.changePresence(admin.id, presence.id, new Date(2022,1,3));

        expect(updated).toStrictEqual({ ...presence, date: new Date(2022,1,3) });

        expect(administratorRepositoryMock.findById).toBeCalledTimes(1);
        expect(administratorRepositoryMock.findById).toBeCalledWith(admin.id);
        
        expect(presenceRepositoryMock.findById).toBeCalledTimes(1);
        expect(presenceRepositoryMock.findById).toBeCalledWith(presence.id);

        expect(presenceServiceMock.changePresenceDate).toBeCalledTimes(1);
        expect(presenceServiceMock.changePresenceDate).toBeCalledWith(presence, new Date(2022,1,3));


    });

    it("Should not update presence if used wrong values", async () => {

        const { 
            presenceController,
            presenceRepositoryMock,
            administratorRepositoryMock
        } = administratorControllerFactory();

        const admin = { id: "admin", username: "username" } as Administrator;

        administratorRepositoryMock.findById.mockResolvedValueOnce(admin);
        presenceRepositoryMock.findById.mockResolvedValue(null);
        
        await expect(
            presenceController.changePresence(admin.id, "presenceId", new Date(2022,1,3))
        ).rejects.toThrow("Presence not founded");

        administratorRepositoryMock.findById.mockResolvedValueOnce(null);

        await expect(
            presenceController.changePresence(admin.id, "presenceId", new Date(2022,1,3))
        ).rejects.toThrow("Administrator not founded");

    });

    it("Should delete presence", async () => {

        const { 
            presenceController,
            presenceRepositoryMock,
            administratorRepositoryMock,
            presenceServiceMock,
        } = administratorControllerFactory();

        const admin = { id: "admin", username: "username" } as Administrator;
        const user = { id: "id", cpf: "cpf" } as User;

        const presence = { id: "id", user, date: new Date(2022,1,1) } as Presence;

        administratorRepositoryMock.findById.mockResolvedValueOnce(admin);
        presenceRepositoryMock.findById.mockResolvedValueOnce(presence);

        await presenceController.deletePresence(admin.id, presence.id);

        expect(administratorRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(administratorRepositoryMock.findById).toHaveBeenCalledWith(admin.id);
        
        expect(presenceRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(presenceRepositoryMock.findById).toHaveBeenCalledWith(presence.id);
        
        expect(presenceServiceMock.deletePresence).toHaveBeenCalledTimes(1);
        expect(presenceServiceMock.deletePresence).toHaveBeenCalledWith(presence);

    });

    it("Should not delete presence if used wrong values", async () => {

        const { 
            presenceController,
            presenceRepositoryMock,
            administratorRepositoryMock
        } = administratorControllerFactory();

        const admin = { id: "admin", username: "username" } as Administrator;

        administratorRepositoryMock.findById.mockResolvedValueOnce(admin);
        presenceRepositoryMock.findById.mockResolvedValue(null);
        
        await expect(
            presenceController.deletePresence(admin.id, "presenceId")
        ).rejects.toThrow("Presence not founded");

        administratorRepositoryMock.findById.mockResolvedValueOnce(null);

        await expect(
            presenceController.deletePresence(admin.id, "presenceId")
        ).rejects.toThrow("Administrator not founded");

    });

});