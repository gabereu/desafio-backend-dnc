import { UserRepository as IUserRepository, UserRepositorySymbol } from "@domain/repository/UserRepository";
import { UserRepository } from "@infra/typeorm/repository/UserRepository";
import { AdministratorRepository as IAdministratorRepository, AdministratorRepositorySymbol } from "@domain/repository/AdministratorRepository";
import { AdministratorRepository } from "@infra/typeorm/repository/AdministratorRepository";
import { PresenceRepository as IPresenceRepository, PresenceRepositorySymbol } from "@domain/repository/PresenceRepository";
import { PresenceRepository } from "@infra/typeorm/repository/PresenceRepository";
import { Container } from "inversify";
import { DataSource } from "typeorm";
import { appDataSource } from "@infra/typeorm/app";
import { UserController } from "@application/controllers/UserController";
import { AdministratorController } from "@application/controllers/AdministratorController";
import { PresenceController } from "@application/controllers/PresenceController";
import { UserService } from "@domain/service/UserService";
import { AdministratorService } from "@domain/service/AdministratorService";
import { PresenceService } from "@domain/service/PresenceService";

export const container = new Container({ defaultScope: "Singleton" });

container.bind<DataSource>(DataSource).toDynamicValue(() => appDataSource);

container.bind<IUserRepository>(UserRepositorySymbol).to(UserRepository);
container.bind<IAdministratorRepository>(AdministratorRepositorySymbol).to(AdministratorRepository);
container.bind<IPresenceRepository>(PresenceRepositorySymbol).to(PresenceRepository);

container.bind<UserService>(UserService).to(UserService);
container.bind<AdministratorService>(AdministratorService).to(AdministratorService);
container.bind<PresenceService>(PresenceService).to(PresenceService);

container.bind<UserController>(UserController).to(UserController);
container.bind<AdministratorController>(AdministratorController).to(AdministratorController);
container.bind<PresenceController>(PresenceController).to(PresenceController);
