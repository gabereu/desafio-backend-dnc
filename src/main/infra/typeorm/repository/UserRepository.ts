import { User as IUser } from "@domain/models/User";
import { UserRepository as IUserRepository, UserToSave } from "@domain/repository/UserRepository"
import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { User } from "../models/User";

@injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @inject(DataSource) private dataSource: DataSource,
    ) {}

    public async findById(id: string): Promise<IUser | null> {
        return this.dataSource.manager.findOneBy(User, { id });
    }

    public async findByCpf(cpf: string): Promise<IUser | null> {
        return this.dataSource.manager.findOneBy(User, { cpf });
    }

    public async save(userToSave: UserToSave): Promise<IUser> {
        const user = new User();
        user.cpf = userToSave.cpf;
        if(userToSave.id){
            user.id = userToSave.id;
        }
        return this.dataSource.manager.save(user);
    }

}
