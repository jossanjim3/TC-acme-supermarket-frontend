import { Entity } from './entity.model';

export class Datawarehouse extends Entity {
    TripsPerManager: {};
    ApplicationsPerTrip: {};
    PriceTrip: {};
    ratioApplications: {};
    averagePriceRangeExplorers: {};
    Top10keywords: [];
    computationMoment: string;
    rebuildPeriod: string;
    _id: string;
    __v: 0;

    constructor() {
        super();
    }
}
