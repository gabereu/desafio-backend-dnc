import { UserRepository } from "@infra/typeorm/repository/UserRepository";
import { DataSource } from "typeorm";
import { testDataSourceFatory } from "../testDataSource";

describe("Typeorm UserRepository", () => {

    let testDataSource: DataSource;

    beforeEach(async () => {
        testDataSource = await testDataSourceFatory()
    });

    afterEach(async () => {
        await testDataSource.destroy()
    });

    it("Should create an user", async () => {
        
        const userRepository = new UserRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        expect(user.cpf).toBe("cpf");
        expect(user.id).toBeDefined();

    });

    it("Should find an user by cpf", async () => {
        
        const userRepository = new UserRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        const finded = await userRepository.findByCpf("cpf");

        expect(finded).toStrictEqual(user);

    });

    it("Should find an user by id", async () => {
        
        const userRepository = new UserRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        const finded = await userRepository.findById(user.id);

        expect(finded).toStrictEqual(user);

    });

    it("Should update an user", async () => {
        
        const userRepository = new UserRepository(testDataSource);

        const user = await userRepository.save({ cpf: "cpf" });

        user.cpf = "new_cpf";

        const updated = await userRepository.save(user);

        const finded = await userRepository.findById(user.id);

        expect(updated).toStrictEqual(user);
        expect(finded).toStrictEqual(user);

    });

});
