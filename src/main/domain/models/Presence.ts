import { User } from "./User";

export interface Presence {
    id: string;
    user: User;
    date: Date;
}