import { User } from "../models/User.js";
import { UserRepository } from "../repository/UserRepository.js";

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