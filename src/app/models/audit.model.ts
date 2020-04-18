import { Entity } from './entity.model';

export class Audit extends Entity {
    _id: string;
    title:  {
        type: String,
    };
    description: {
        type: String,
    };
    atachment:  {
        type: String,
    };
    auditor: {
        type: String,
    };
    trip: {
        type: String,
    };

    constructor() {
        super();
    }
}
