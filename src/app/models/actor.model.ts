import { Entity } from './entity.model';

export class Actor extends Entity {

    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    language: 'es';
    validated: boolean;
    role: string;
    customToken: string;
    idToken: string;
}
