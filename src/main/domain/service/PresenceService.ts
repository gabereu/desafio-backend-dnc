import { inject, injectable } from "inversify";
import { Presence } from "../models/Presence";
import { User } from "../models/User";
import { PresenceRepository, PresenceRepositorySymbol } from "../repository/PresenceRepository";

@injectable()
export class PresenceService {

    constructor(
        @inject(PresenceRepositorySymbol) private presenceRepository: PresenceRepository,
    ) {}

    public async registerPresence(user: User, date?: Date ): Promise<Presence> {
       return this.presenceRepository.save({ user, date: date ?? new Date() });
    }

    public async changePresenceDate(presence: Presence, toDate: Date): Promise<Presence> {
        return this.presenceRepository.save({
            ...presence,
            date: toDate
        });
    }

    public async deletePresence(presence: Presence){
        this.presenceRepository.delete(presence);
    }

}