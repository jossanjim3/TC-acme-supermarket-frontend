import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Audit } from '../models/audit.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  // usamos funciones async porque se llaman unas a las otras y asi no da error
  async getTripAudits(tripId: String) {

    // obtiene todos los audits de un viaje
    const url = `${environment.backendApiBaseURL}/v1/audits/trips/${tripId}`;

    return this.http.get<Audit[]>(url).toPromise();
  }

}
