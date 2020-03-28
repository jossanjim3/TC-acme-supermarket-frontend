
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ActorService {

    token: string;
    userRole: string;
    // private backendApiBaseURL = 'http://localhost:8080';

    constructor(
        private http: HttpClient,
        private authService: AuthService) {
    }

    getActor(id: string) {
        const url = `${environment.backendApiBaseURL}/v1/actors/${id}`;
        return this.http.get<Actor>(url).toPromise();
    }

    updateProfile(actor: Actor) {
        const url = `${environment.backendApiBaseURL}/v2/actors/${actor.id}`;

        const putActor = JSON.parse(JSON.stringify(actor));
        delete putActor.idToken;
        delete putActor.customToken;

        const body = JSON.stringify(actor);

        return new Promise<any>((resolve, reject) => {
            this.http.put(url, body,   {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'idtoken': actor.idToken
                })}).toPromise()
                .then(res => {
                    resolve(res);
                }, err => { console.log(err); reject(err); });
        });
    }
}
