import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Datawarehouse } from '../models/datawarehouse.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DatawarehouseService {

  constructor(private http: HttpClient) { }

  getDataWareHouseLatest() {
    const url = `${environment.backendApiBaseURL}/v1/datawarehouse/latest`;
    return this.http.get<Datawarehouse>(url).toPromise();
  }
}
