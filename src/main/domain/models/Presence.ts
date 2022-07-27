import { User } from "./User.js";

export interface Presence {
    id: string;
    user: User;
    date: Date;
}