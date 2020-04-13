import { Entity } from './entity.model';
import { Actor } from './actor.model';
import { Trip } from './trip.model';

export class Application extends Entity {
    _id: string;
    status:  {
        type: String,
    };
    comment:  {
        type: String,
    };
    reasonCancel: {
        type: String,
    };
    explorer: {
        type: String,
    };
    trip: {
        type: String,
    };

    constructor() {
        super();
    }
}
