import { Optional } from "utility-types";
import { Presence } from "../models/Presence";
import { User } from "../models/User";

export interface PresenceRepository {
    findById(id: string): Promise<Presence | null>;

    findByUser(user: User): Promise<Presence[]>;
    findByUserBetweenDates(user: User, fromDate: Date, toDate: Date): Promise<Presence[]>;

    findAll(): Promise<Presence[]>;
    findAllBetweenDates(fromDate: Date, toDate: Date): Promise<Presence[]>;
    
    save(presence: PresenceToSave): Promise<Presence>;
    delete(presence: Presence): Promise<void>;
}

export interface PresenceToSave extends Optional<Presence, 'id'> {
}

export const PresenceRepositorySymbol = Symbol("PresenceRepository");
