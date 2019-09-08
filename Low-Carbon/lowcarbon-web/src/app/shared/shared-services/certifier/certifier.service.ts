import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../vehicle/models/vehicle';
import { environment } from 'src/environments/environment';
import { Certifier } from './models/certifier';

@Injectable({
  providedIn: 'root'
})
export class CertifierService {
  constructor(private http : HttpClient) { }

  getCompanies(){
    return this.http.get<Certifier[]>(`${environment.api_url}/SensorCertifier`);
  }
}
