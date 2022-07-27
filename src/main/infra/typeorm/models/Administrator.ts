import { Administrator as IAdministrator } from "@domain/models/Administrator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Administrator implements IAdministrator {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    username!: string;
}
