import { Presence } from "../models/Presence";
import { User } from "../models/User";
import { PresenceRepository } from "../repository/PresenceRepository";

export class PresenceService {

    constructor(
        private presenceRepository: PresenceRepository,
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