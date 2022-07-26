import { Optional } from "utility-types";
import Administrator from "../models/Administrator";

export interface AdministratorRepository {
    findById(id: string): Promise<Administrator>;

    findByUsername(username: string): Promise<Administrator>;
    
    save(administrator: AdministratorToSave): Promise<Administrator>;
}

export interface AdministratorToSave extends Optional<Administrator, 'id'>{

}