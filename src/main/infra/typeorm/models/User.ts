import { User as IUser } from "@domain/models/User";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    cpf!: string;
}
