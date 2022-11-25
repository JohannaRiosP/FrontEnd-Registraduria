import { Rol } from "./rol.model";

export class User {
    id?: string;
    nickname?: string;
    email?: string;
    password?: string;
    token?: string;
    rol?: Rol;
}
