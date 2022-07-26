import { User } from "../models/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    public async login(cpf: string): Promise<User>{
        let user = await this.userRepository.findByCpf(cpf);

        if(user == null){
            user = await this.userRepository.save({ cpf });
        }

        return user;
    }
}