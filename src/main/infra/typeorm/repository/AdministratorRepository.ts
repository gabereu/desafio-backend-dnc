import { Administrator as IAdministrator } from "@domain/models/Administrator";
import { AdministratorRepository as IAdministratorRepository, AdministratorToSave } from "@domain/repository/AdministratorRepository";
import { DataSource } from "typeorm";
import { Administrator } from "../models/Administrator";

export class AdministratorRepository implements IAdministratorRepository {

    constructor(
        private dataSource: DataSource,
    ) {}

    public async findById(id: string): Promise<IAdministrator | null> {
        return this.dataSource.manager.findOneBy(Administrator, { id });
    }

    public async findByUsername(username: string): Promise<IAdministrator | null> {
        return this.dataSource.manager.findOneBy(Administrator, { username });
    }
    
    public async save(administratorToSave: AdministratorToSave): Promise<IAdministrator> {
        const administrator = new Administrator();
        administrator.username = administratorToSave.username;
        if(administratorToSave.id){
            administrator.id = administratorToSave.id;
        }
        return this.dataSource.manager.save(administrator);
    }
    
}
