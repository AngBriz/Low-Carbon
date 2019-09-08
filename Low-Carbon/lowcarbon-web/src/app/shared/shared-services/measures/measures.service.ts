import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleMeasure, Measure } from './models/VehicleMeasure';
import NanoDate, * as nano from 'nano-date';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {

  constructor(private http : HttpClient) {
    this.http.post(`${environment.influxdb_url}/query?q=CREATE DATABASE "CO2"`,{}).subscribe()
    this.http.post(`${environment.api_url}/VehicleCompany`,{ numberVehicles: 0,companyId: "BlockPower1", name: "BlockPower"}).subscribe()
    this.http.post(`${environment.api_url}/SensorCertifier`,  {companyId: "BlockPower1", name: "Cabon Cerfifier"}).subscribe()
  }

  create(measure : VehicleMeasure){
    let nanoDate : NanoDate
    if(measure.time){
      nanoDate = new NanoDate(measure.time);
    }else{
      nanoDate = new NanoDate()
    }
    return this.http.post(`${environment.influxdb_url}/write?db=CO2`, `measures,company=${measure.company},vinId=${measure.vinId},sensor=${measure.sensor} value=${measure.value} ${nanoDate.getTime()}` )
  }

  getSumMeasuresByCompany(companyId : string, dateStart : string, dateEnd : string){
    return this.http.get<Measure>(`${environment.influxdb_url}/query?db=CO2&q=SELECT sum(*)  FROM "measures" where company = '${companyId}' and time >= '${dateStart}' and time <= '${dateEnd}'`).pipe(
      map(o => {
        return { value : o.results[0].series[0].values[0][1] }
      })
    )
  }

  getValuesMeasuresByCompany(companyId : string, dateStart: string, dateEnd: string){
    return this.http.get<Measure>(`${environment.influxdb_url}/query?db=CO2&q=SELECT  MEAN(*)  FROM "measures" where company = '${companyId}' and time >= '${dateStart}' and time <= '${dateEnd}' GROUP BY  "vinId",time(1d)`)
  }

  /*getValuesMeasuresByCompany(companyId : string, dateStart : string, dateEnd : string){
    return this.http.get<Measures>(`http://localhost:8086/query?db=CO2&q=SELECT sum(*) FROM "measures" where company = '${companyId}' and  and time >= '${dateStart}' and time <= '${dateEnd}'`)
  }*/
}
