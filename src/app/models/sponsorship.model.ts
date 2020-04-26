import { Entity } from './entity.model';

export class Sponsorship extends Entity {
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
