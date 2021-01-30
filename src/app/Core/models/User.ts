import { Menu } from './';

export interface User {
    userId?: number;
    name?: string;
    email?: string;
    password?: string;
    imgSrc?: string;
    createdAt?: Date;
    archive?: boolean;
    rolId?: number;
}

export interface UserLoginResponse {
    user: User;
    menu: Menu[];
    token: string;
}
