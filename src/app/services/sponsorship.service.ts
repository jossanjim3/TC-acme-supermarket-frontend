import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sponsorship } from '../models/sponsorship.model';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {

  constructor(private http: HttpClient) { }

  getListSponsorshipsOfSponsor(id: string) {
    const url = `${environment.backendApiBaseURL}/v1/sponsorships/sponsors/${id}`;
    return this.http.get<Sponsorship[]>(url).toPromise();
  }

  getSponsorshipById(id: string) {
    const url = `${environment.backendApiBaseURL}/v1/sponsorships/${id}`;
    return this.http.get<Sponsorship>(url).toPromise();
  }

  getSponsorshipsTrips(id: string) {
    const url = `${environment.backendApiBaseURL}/v1/sponsorships/trips/${id}`;
    return this.http.get<Sponsorship[]>(url).toPromise();
  }
}
