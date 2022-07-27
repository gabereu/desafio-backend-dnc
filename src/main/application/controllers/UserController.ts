import { UserService } from "@domain/service/UserService";
import { inject, injectable } from "inversify";

@injectable()
export class UserController {

    constructor(
        @inject(UserService) private userService: UserService,
    ) {}

    public async loginUser(cpf: string): Promise<String> {

        const user = await this.userService.login(cpf);

        return user.id;
    }

}
