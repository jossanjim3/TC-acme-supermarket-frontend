import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Audit } from '../models/audit.model';
import { AuthService } from './auth.service';
import { Actor } from '../models/actor.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient, private authService: AuthService, private messageService: MessageService) {

  }

  // usamos funciones async porque se llaman unas a las otras y asi no da error
  async getTripAudits(tripId: String) {

    // obtiene todos los audits de un viaje
    const url = `${environment.backendApiBaseURL}/v1/audits/trips/${tripId}`;

    return this.http.get<Audit[]>(url).toPromise();
  }

  async getAllAuditorAudits() {

    // obtiene todos los audits de un auditor

    let url = '';
    // url = `${environment.backendApiBaseURL}/v1/applications`;

    const actorData = await this.authService.getCurrentActor();
    if (actorData !== null) {
      // console.log('actorData ngOnInit: ' + actorData);
      const userId = actorData._id;
      // console.log('userId: ' + userId);
      url = `${environment.backendApiBaseURL}/v1/audits/users/${userId}`;
      // console.log('url: ' + url);

    } else {
      this.messageService.notifyMessage('User null', 'alert alert-success');

    }

    return this.http.get<Audit[]>(url).toPromise();

  }

}
