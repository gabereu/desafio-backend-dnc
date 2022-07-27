import { AdministratorRepository } from "@infra/typeorm/repository/AdministratorRepository";
import { DataSource } from "typeorm";
import { testDataSourceFatory } from "../testDataSource";

describe("Typeorm AdministratorRepository", () => {

    let testDataSource: DataSource;

    beforeEach(async () => {
        testDataSource = await testDataSourceFatory()
    });

    afterEach(async () => {
        await testDataSource.destroy()
    });

    it("Should create an administrator", async () => {
        
        const administratorRepository = new AdministratorRepository(testDataSource);

        const administrator = await administratorRepository.save({ username: "administrator" });

        expect(administrator.username).toBe("administrator");
        expect(administrator.id).toBeDefined();

    });

    it("Should find an administrator by username", async () => {
        
        const administratorRepository = new AdministratorRepository(testDataSource);

        const administrator = await administratorRepository.save({ username: "administrator" });

        const finded = await administratorRepository.findByUsername("administrator");

        expect(finded).toStrictEqual(administrator);

    });

    it("Should find an administrator by id", async () => {
        
        const administratorRepository = new AdministratorRepository(testDataSource);

        const administrator = await administratorRepository.save({ username: "administrator" });

        const finded = await administratorRepository.findById(administrator.id);

        expect(finded).toStrictEqual(administrator);

    });

    it("Should update an administrator", async () => {
        
        const administratorRepository = new AdministratorRepository(testDataSource);

        const administrator = await administratorRepository.save({ username: "administrator" });

        administrator.username = "new_administrator";

        const updated = await administratorRepository.save(administrator);

        const finded = await administratorRepository.findById(administrator.id);

        expect(updated).toStrictEqual(administrator);
        expect(finded).toStrictEqual(administrator);

    });

});
