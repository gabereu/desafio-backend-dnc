import { Presence } from "@domain/models/Presence";
import { AdministratorRepository } from "@domain/repository/AdministratorRepository";
import { PresenceRepository } from "@domain/repository/PresenceRepository";
import { UserRepository } from "@domain/repository/UserRepository";
import { PresenceService } from "@domain/service/PresenceService";

export class PresenceController {

    constructor(
        private presenceService: PresenceService,
        private presenceRepository: PresenceRepository,
        private userRepository: UserRepository,
        private administratorRepository: AdministratorRepository,
    ) {}

    public async registerPresenceFromUser(userId: string): Promise<Presence>{
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error("User not founded");
        }

        const presence = await this.presenceService.registerPresence(user);

        return presence;
    }

    public async registerPresenceFromUserByAdmin(userId: string, date: Date, adminId: string): Promise<Presence>{

        const admin = await this.administratorRepository.findById(adminId);

        if(!admin){
            throw new Error("Not authenticated");
        }

        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error("User not founded");
        }

        if(!date){
            throw new Error("Date must not be null");
        }

        const presence = await this.presenceService.registerPresence(user, date);

        return presence;
    }

    public async findByUser({ userId, fromDate, toDate }: PresenceByUserQuery) : Promise<Presence[]> {
        
        if( ( fromDate && !toDate ) || ( !fromDate && toDate ) ){
            throw new Error("You must provide fromDate and toDate, or none of both");
        }

        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new Error("User not founded");
        }

        if(fromDate && toDate){
            return await this.presenceRepository.findByUserBetweenDates(user, fromDate, toDate);
        }

        return await this.presenceRepository.findByUser(user);
    }

    public async findAll({ adminId, fromDate, toDate }: PresenceByAdminQuery) : Promise<Presence[]> {
        
        if( ( fromDate && !toDate ) || ( !fromDate && toDate ) ){
            throw new Error("You must provide fromDate and toDate, or none of both");
        }

        const admin = await this.administratorRepository.findById(adminId);

        if(!admin){
            throw new Error("Administrator not founded");
        }

        if(fromDate && toDate){
            return await this.presenceRepository.findAllBetweenDates(fromDate, toDate);
        }

        return await this.presenceRepository.findAll();
    }

    public async changePresence(adminId: string, presenceId: string, toDate: Date): Promise<Presence> {
        const admin = await this.administratorRepository.findById(adminId);

        if(!admin){
            throw new Error("Administrator not founded");
        }

        const presence = await this.presenceRepository.findById(presenceId);

        if(!presence){
            throw new Error("Presence not founded");
        }

        const presenceUpdated = await this.presenceService.changePresenceDate(presence, toDate);

        return presenceUpdated;
    }

    public async deletePresence(adminId: string, presenceId: string) {
        const admin = await this.administratorRepository.findById(adminId);

        if(!admin){
            throw new Error("Administrator not founded");
        }

        const presence = await this.presenceRepository.findById(presenceId);

        if(!presence){
            throw new Error("Presence not founded");
        }

        await this.presenceService.deletePresence(presence);
    }

}

interface PresenceByUserQuery {
    fromDate?: Date,
    toDate?: Date,
    userId: string,
}

interface PresenceByAdminQuery {
    fromDate?: Date,
    toDate?: Date,
    adminId: string,
}