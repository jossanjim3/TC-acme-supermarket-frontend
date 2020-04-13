import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(
    private http: HttpClient) {
  }

  getApplications() {
    // const url = `${environment.backendApiBaseURL}/v1/applications/users/${userId}`;
    const url = `${environment.backendApiBaseURL}/v1/applications`;
    return this.http.get<Application[]>(url).toPromise();
  }

}
