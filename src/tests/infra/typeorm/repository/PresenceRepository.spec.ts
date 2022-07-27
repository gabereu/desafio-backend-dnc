import { PresenceRepository } from "@infra/typeorm/repository/PresenceRepository";
import { UserRepository } from "@infra/typeorm/repository/UserRepository";
import { DataSource } from "typeorm";
import { testDataSourceFatory } from "../testDataSource";

describe("Typeorm PresenceRepository", () => {

    let testDataSource: DataSource;

    beforeEach(async () => {
        testDataSource = await testDataSourceFatory()
    });

    afterEach(async () => {
        await testDataSource.destroy()
    });

    it("Should create an presence", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        const date = new Date(2022, 1, 1);

        const presence = await presenceRepository.save({ user, date });

        expect(presence.date).toBe(date);
        expect(presence.user).toStrictEqual(user);
        expect(presence.id).toBeDefined();

    });

    it("Should update an presence", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });
        const user2 = await userRepository.save({ cpf: "cpf2" });

        const date = new Date(2022, 1, 1);

        const presence = await presenceRepository.save({ user, date });

        presence.date = new Date(2022, 1, 1);
        presence.user = user2;

        await presenceRepository.save(presence);

        const finded = await presenceRepository.findById(presence.id);

        expect(finded).toBeTruthy();
        expect(finded?.date).toStrictEqual(presence.date);
        expect(finded?.user).toStrictEqual(presence.user);
    });
    
    it("Should find a presence by id", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        const date = new Date(2022, 1, 1);

        const presence = await presenceRepository.save({ user, date });

        const finded = await presenceRepository.findById(presence.id);

        expect(presence).toStrictEqual(finded);
    });

    it("Should find a presence by user", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const date = new Date(2022, 1, 1);
        const date2 = new Date(2022, 1, 1);

        const user = await userRepository.save({ cpf: "cpf" });
        const presence = await presenceRepository.save({ user, date });
        const presence2 = await presenceRepository.save({ user, date: date2 });

        // Some data that can't be finded
        const user2 = await userRepository.save({ cpf: "cpf2" });
        await presenceRepository.save({ user: user2, date });

        const finded = await presenceRepository.findByUser(user);

        expect(finded).toContainEqual(presence);
        expect(finded).toContainEqual(presence2);
    });

    it("Should update a presence", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        const date = new Date(2022, 1, 1);

        const presence = await presenceRepository.save({ user, date });

        const newDate = new Date(2022, 1, 2);
        
        presence.date = newDate;

        const updated = await presenceRepository.save(presence);

        const finded = await presenceRepository.findById(presence.id);

        expect(presence).toStrictEqual(updated);
        expect(presence).toStrictEqual(finded);

    });

    it("Should find all presences", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const date = new Date(2022, 1, 1);
        const date2 = new Date(2022, 1, 20);
        const date3 = new Date(2022, 1, 10);

        const user = await userRepository.save({ cpf: "cpf" });
        const presence = await presenceRepository.save({ user, date });
        const presence2 = await presenceRepository.save({ user, date: date2 });

        const user2 = await userRepository.save({ cpf: "cpf2" });
        const presence3 = await presenceRepository.save({ user: user2, date: date3 });

        const finded = await presenceRepository.findAll();

        expect(finded).toHaveLength(3);
        expect(finded).toContainEqual(presence);
        expect(finded).toContainEqual(presence2);
        expect(finded).toContainEqual(presence3);
    });

    it("Should find all presences between dates", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const date = new Date(2022, 1, 1);
        const date2 = new Date(2022, 1, 20);
        const date3 = new Date(2022, 1, 10);

        const user = await userRepository.save({ cpf: "cpf" });
        const presence = await presenceRepository.save({ user, date });
        const presence2 = await presenceRepository.save({ user, date: date2 });

        const user2 = await userRepository.save({ cpf: "cpf2" });
        const presence3 = await presenceRepository.save({ user: user2, date: date3 });

        const finded = await presenceRepository.findAllBetweenDates(date, date3);

        expect(finded).toHaveLength(2);
        expect(finded).toContainEqual(presence);
        expect(finded).toContainEqual(presence3);
    });

    it("Should find all presences from user", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const date = new Date(2022, 1, 1);
        const date2 = new Date(2022, 1, 20);
        const date3 = new Date(2022, 1, 10);

        const user = await userRepository.save({ cpf: "cpf" });
        const presence = await presenceRepository.save({ user, date });
        const presence2 = await presenceRepository.save({ user, date: date2 });

        const user2 = await userRepository.save({ cpf: "cpf2" });
        const presence3 = await presenceRepository.save({ user: user2, date: date3 });

        const finded = await presenceRepository.findByUserBetweenDates(user, date, date3);

        expect(finded).toHaveLength(1);
        expect(finded).toContainEqual(presence);

    });


    it("Should delete a presence from user", async () => {
        
        const userRepository = new UserRepository(testDataSource);
        const presenceRepository = new PresenceRepository(testDataSource);

        const date = new Date(2022, 1, 1);
        const date2 = new Date(2022, 1, 20);
        const date3 = new Date(2022, 1, 10);

        const user = await userRepository.save({ cpf: "cpf" });
        const presence = await presenceRepository.save({ user, date });
        const presence2 = await presenceRepository.save({ user, date: date2 });

        await presenceRepository.delete(presence)

        const finded = await presenceRepository.findByUser(user);

        expect(finded).toHaveLength(1);
        expect(finded).toContainEqual(presence2);

    });
    

});
