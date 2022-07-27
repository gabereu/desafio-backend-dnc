import { Optional } from "utility-types";
import { User } from "../models/User.js";

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    
    findByCpf(cpf: string): Promise<User | null>;

    save(user: UserToSave): Promise<User>;
}

export interface UserToSave extends Optional<User, 'id'>{

}