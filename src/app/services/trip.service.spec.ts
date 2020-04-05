import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TripService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClient, HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: TripService = TestBed.get(TripService);
    expect(service).toBeTruthy();
  });
});
