import { Entity } from './entity.model';

export class Trip extends Entity {
    ticker: string;
    title: string;
    description: string;
    price: Number;
    requirements: string[];
    startDate: Date;
    endDate: Date;
    pictures: string[];
    manager: string;
    // TODO: add Stages schema
    isPublished: Boolean;
    reasonCancel: string;

    constructor() {
        super();
    }
}
