import { Entity } from './entity.model';

export class Sponsorship extends Entity {
    _id: string;
    banner: string;
    link: string;
    sponsor: string;
    tripSponsorships: [{
        trip: string;
        paid: boolean;
    }];
    constructor () {
        super();
    }
}
