import Administrator from "../models/Administrator";
import { AdministratorRepository } from "../repository/AdministratorRepository";

export class AdministratorService {
    constructor(
        private administratorRepository: AdministratorRepository,
    ) {}

    public async login(username: string): Promise<Administrator>{
        let user = await this.administratorRepository.findByUsername(username);

        if(user == null){
            user = await this.administratorRepository.save({ username });
        }

        return user;
    }
}