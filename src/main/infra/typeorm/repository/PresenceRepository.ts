import { Presence as IPresence } from '@domain/models/Presence';
import { User } from '@domain/models/User';
import { PresenceRepository as IPresenceRepository, PresenceToSave } from '@domain/repository/PresenceRepository'
import { inject, injectable } from 'inversify';
import { Between, DataSource } from 'typeorm';
import { Presence } from '../models/Presence';

@injectable()
export class PresenceRepository implements IPresenceRepository {

    constructor(
        @inject(DataSource) private dataSource: DataSource,
    ) {}

    public async findById(id: string): Promise<IPresence | null> {
        return this.dataSource.getRepository(Presence).findOne({ where: { id }, relations: { user: true } });
    }

    public async findByUser(user: User): Promise<IPresence[]> {
        return this.dataSource.getRepository(Presence).find({ where: { user }, relations: { user: true } });
    }

    public async findByUserBetweenDates(user: User, fromDate: Date, toDate: Date): Promise<IPresence[]> {
        return this.dataSource.getRepository(Presence).find({
            where: { user, date: Between(fromDate, toDate) },
            relations: { user: true }
        });
    }

    public async findAll(): Promise<IPresence[]> {
        return this.dataSource.getRepository(Presence).find({
            relations: { user: true }
        });
    }

    public async findAllBetweenDates(fromDate: Date, toDate: Date): Promise<IPresence[]> {
        return this.dataSource.getRepository(Presence).find({
            where: { date: Between(fromDate, toDate) },
            relations: { user: true }
        });
    }

    public async save(presenceToSave: PresenceToSave): Promise<IPresence> {

        const presence = new Presence();
        presence.user = presenceToSave.user;
        presence.date = presenceToSave.date;
        if(presenceToSave.id){
            presence.id = presenceToSave.id;
        }

        return this.dataSource.manager.save(presence);
    }

    public async delete(presence: IPresence): Promise<void> {
        await this.dataSource.manager.delete(Presence, presence.id);
    }

}
