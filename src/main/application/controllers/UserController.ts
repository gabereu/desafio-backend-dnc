import { UserService } from "@domain/service/UserService";

export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    public async loginUser(cpf: string): Promise<String> {

        const user = await this.userService.login(cpf);

        return user.id;
    }

}
