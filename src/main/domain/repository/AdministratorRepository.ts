import { Optional } from "utility-types";
import { Administrator} from "../models/Administrator.js";

export interface AdministratorRepository {
    findById(id: string): Promise<Administrator | null>;

    findByUsername(username: string): Promise<Administrator | null>;
    
    save(administrator: AdministratorToSave): Promise<Administrator>;
}

export interface AdministratorToSave extends Optional<Administrator, 'id'>{

}