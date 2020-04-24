import { Entity } from './entity.model';
import { Audit } from './audit.model';
import { Picture } from './picture.model';

export class Trip extends Entity {
    ticker: string;
    title: string;
    description: string;
    price: Number;
    requeriments: string[];
    startDate: Date;
    endDate: Date;
    pictures: string[];
    picturesObject: Picture[];
    manager: string;
    // TODO: add Stages schema
    stages: [{
        _id: string,
        title: string,
        description: string,
        price: number,
    }];
    isPublished: Boolean;
    reasonCancel: string;

    auditObj: Audit;

    constructor() {
        super();
    }
}
