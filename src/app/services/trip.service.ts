import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(
    private http: HttpClient) {
  }


  getTrip(id: string) {
    const url = `${environment.backendApiBaseURL}/v1/trips/${id}`;
    return this.http.get<Trip>(url).toPromise();
  }

}
