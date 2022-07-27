import { AdministratorService } from "@domain/service/AdministratorService";

export class AdministratorController {

    constructor(
        private administratorService: AdministratorService,
    ) {}

    public async loginAdministrator(username: string): Promise<String> {

        const administrator = await this.administratorService.login(username);

        return administrator.id;
    }

}
