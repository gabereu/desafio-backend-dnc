import { AdministratorService } from "@domain/service/AdministratorService";
import { inject, injectable } from "inversify";

@injectable()
export class AdministratorController {

    constructor(
        @inject(AdministratorService) private administratorService: AdministratorService,
    ) {}

    public async loginAdministrator(username: string): Promise<String> {

        const administrator = await this.administratorService.login(username);

        return administrator.id;
    }

}
