import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from './models/vehicle';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http : HttpClient) { }

  get() {
    return this.http.get<Vehicle[]>(`${environment.api_url}/Vehicle`);
  }

  getbyId(vinId : string) {
    return this.http.get<Vehicle>(`${environment.api_url}/Vehicle/${vinId}`);
  }

  create(vehicle: Vehicle) {
    return this.http.post(`${environment.api_url}/Vehicle`,vehicle);
  }

  update(vehicle: Vehicle) {
    return this.http.put(`${environment.api_url}/Vehicle/${vehicle.vinId}`,vehicle);
  }
}
