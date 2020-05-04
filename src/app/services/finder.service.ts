import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(
    private http: HttpClient) {
  }

  async getFinderUser(id: string) {
    const url = `${environment.backendApiBaseURL}/v1/finders/explorers/${id}`;
    return this.http.get(url).toPromise();
  }

  async updateFinderUser(finder: any, id: string) {
    const url = `${environment.backendApiBaseURL}/v1/finders/explorers/${id}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(finder);
    console.log(body);
    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, httpOptions).toPromise()
        .then(res => {
          resolve(res);
        }, err => {console.error(err); reject(err); });
    });
  }
}
