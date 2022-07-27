import { inject, injectable } from "inversify";
import { User } from "../models/User";
import { UserRepository, UserRepositorySymbol } from "../repository/UserRepository";

@injectable()
export class UserService {
    constructor(
        @inject(UserRepositorySymbol) private userRepository: UserRepository,
    ) {}

    public async login(cpf: string): Promise<User>{
        let user = await this.userRepository.findByCpf(cpf);

        if(user == null){
            user = await this.userRepository.save({ cpf });
        }

        return user;
    }
}