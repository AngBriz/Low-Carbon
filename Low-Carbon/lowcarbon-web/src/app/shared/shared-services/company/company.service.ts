import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './models/company';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  getCompanies(){
    return this.http.get<Company[]>(`${environment.api_url}/VehicleCompany`);
  }
}
