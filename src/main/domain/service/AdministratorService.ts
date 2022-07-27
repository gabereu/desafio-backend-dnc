import { inject, injectable } from "inversify";
import { Administrator} from "../models/Administrator";
import { AdministratorRepository, AdministratorRepositorySymbol } from "../repository/AdministratorRepository";

@injectable()
export class AdministratorService {
    constructor(
        @inject(AdministratorRepositorySymbol) private administratorRepository: AdministratorRepository,
    ) {}

    public async login(username: string): Promise<Administrator>{
        let user = await this.administratorRepository.findByUsername(username);

        if(user == null){
            user = await this.administratorRepository.save({ username });
        }

        return user;
    }
}