import { Entity } from './entity.model';

export class Trip extends Entity {
    _id: string;
    ticker: string;
    title: string;
    description: string;
    price: Number;
    requeriments: string[];
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
