import { Administrator} from "../models/Administrator.js";
import { AdministratorRepository } from "../repository/AdministratorRepository.js";

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