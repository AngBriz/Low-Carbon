import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleMeasure, Measure } from './models/VehicleMeasure';
import NanoDate, * as nano from 'nano-date';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService {

  constructor(private http : HttpClient) {
    this.http.post("http://localhost:8086/query?q=CREATE DATABASE CO2","").subscribe()

  }

  create(measure : VehicleMeasure){
    let nanoDate : NanoDate
    if(measure.time){
      nanoDate = new NanoDate(measure.time);
    }else{
      nanoDate = new NanoDate()
    }
    return this.http.post('http://localhost:8086/write?db=CO2', `measures,company=${measure.company},vinId=${measure.vinId},sensor=${measure.sensor} value=${measure.value} ${nanoDate.getTime()}` )
  }

  getSumMeasuresByCompany(companyId : string, dateStart : string, dateEnd : string){
    return this.http.get<Measure>(`http://localhost:8086/query?db=CO2&q=SELECT sum(*)  FROM "measures" where company = '${companyId}' and time >= '${dateStart}' and time <= '${dateEnd}'`).pipe(
      map(o => {
        return { value : o.results[0].series[0].values[0][1] }
      })
    )
  }

  getValuesMeasuresByCompany(companyId : string, dateStart: string, dateEnd: string){
    return this.http.get<Measure>(`http://localhost:8086/query?db=CO2&q=SELECT  MEAN(*)  FROM "measures" where company = '${companyId}' and time >= '${dateStart}' and time <= '${dateEnd}' GROUP BY  "vinId",time(1d)`)
  }

  /*getValuesMeasuresByCompany(companyId : string, dateStart : string, dateEnd : string){
    return this.http.get<Measures>(`http://localhost:8086/query?db=CO2&q=SELECT sum(*) FROM "measures" where company = '${companyId}' and  and time >= '${dateStart}' and time <= '${dateEnd}'`)
  }*/
}
