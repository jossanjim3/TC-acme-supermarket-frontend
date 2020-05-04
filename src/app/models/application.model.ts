import { Entity } from './entity.model';
import { Actor } from './actor.model';
import { Trip } from './trip.model';

export class Application extends Entity {
    _id: string;
    status: String;
    comment: String;
    reasonCancel: String;
    explorer: String;
    trip: String;

    // solo usado en el cliente
    tripObj: Trip;

    constructor() {
        super();
    }
}
