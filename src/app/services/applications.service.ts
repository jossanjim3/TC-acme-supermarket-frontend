import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';
import { AuthService } from './auth.service';
import { Actor } from '../models/actor.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(
    private http: HttpClient, private authService: AuthService, private messageService: MessageService) {
  }

  // usamos funciones async porque se llaman unas a las otras y asi no da error

  async getExplorerApplications() {
    let url = '';
    // url = `${environment.backendApiBaseURL}/v1/applications`;

    const actorData = await this.authService.getCurrentActor();
    if (actorData !== null) {
      // console.log('actorData ngOnInit: ' + actorData);
      const userId = actorData._id;
      // console.log('userId: ' + userId);
      url = `${environment.backendApiBaseURL}/v1/applications/users/${userId}`;
      // console.log('url: ' + url);

    } else {
      this.messageService.notifyMessage('User null', 'alert alert-success');

    }

    return this.http.get<Application[]>(url).toPromise();
  }

  async getTripApplications(tripId: String) {
    const url = `${environment.backendApiBaseURL}/v1/applications/trips/${tripId}`;
      // console.log('url: ' + url);
    return this.http.get<Application[]>(url).toPromise();
  }


  /* getApplications() {
    let url = '';
    // url = `${environment.backendApiBaseURL}/v1/applications`;

    this.authService.getCurrentActor()
      .then( (actorData: Actor) => {
        // console.log('actorData subscribe ngOnInit: ' + actorData);

        if (actorData !== null) {
          // console.log('actorData ngOnInit: ' + actorData);
          const userId = actorData._id;
          console.log('userId: ' + userId);
          url = `${environment.backendApiBaseURL}/v1/applications/users/${userId}`;
          console.log('url: ' + url);
          return this.http.get<Application[]>(url).toPromise();
        }

      })
    .catch( (err) => {
      console.log(err);
      this.messageService.notifyMessage(err, 'alert alert-success');
    });
    return this.http.get<Application[]>(url).toPromise();
  } */

}
