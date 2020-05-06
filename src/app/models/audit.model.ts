import { Entity } from './entity.model';

export class Audit extends Entity {
    _id: string;
    title: string;
    description: string;
    atachment: string;
    auditor: string;
    trip: string;

    constructor() {
        super();
    }
}
