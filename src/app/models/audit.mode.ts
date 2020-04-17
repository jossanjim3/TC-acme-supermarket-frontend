import { Entity } from './entity.model';

export class Application extends Entity {
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
