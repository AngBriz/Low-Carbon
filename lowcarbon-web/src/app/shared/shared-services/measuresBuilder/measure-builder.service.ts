import { Injectable } from '@angular/core';
import { Observable, interval, Subject, observable, of, forkJoin } from 'rxjs';
import { Vehicle } from '../vehicle/models/vehicle';
import { MeasuresService } from '../measures/measures.service';
import { switchMap, mergeMap, filter, map, tap, merge, mergeAll, combineAll } from 'rxjs/operators';
import { VehicleMeasure } from '../measures/models/VehicleMeasure';
import { VehicleRoutingModule } from 'src/app/features/vehicle/vehicle-routing.module';
import { VehicleService } from '../vehicle/vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class MeasureBuilderService {
  intervarl$: Observable<number>;
  vehicles$: Subject<Vehicle[]>;
  constructor(private measure: MeasuresService, private vehicle: VehicleService) {
    this.intervarl$ = interval(2000);
   }


   create(){
     
     return this.intervarl$.pipe(
       switchMap(o => this.vehicle.get().pipe(
          filter(o => o.length > 0),
          mergeMap(o => {
            return o;
          }),
          switchMap(o => this.createMeasureSensor(o))
        )
       )
     )
   }

   createMeasureSensor(vehicle: Vehicle){
      const measures = new Array<Observable<Object>>();
      const todayDate = new Date();
      const date = todayDate.getDate() - Math.floor(Math.random() * 30) + 1
      todayDate.setDate(date);

      if(vehicle.sensor1Id){
        const measure1: VehicleMeasure = { company : vehicle.companyId, sensor : vehicle.sensor1Id, value : Math.floor(Math.random() * 1000) + 400, vinId : vehicle.vinId, time : todayDate };
        measures.push(this.measure.create(measure1))
      }
      if(vehicle.sensor2Id){
        const measure2: VehicleMeasure = { company : vehicle.companyId, sensor : vehicle.sensor2Id, value : Math.floor(Math.random() * 1000) + 400, vinId : vehicle.vinId, time : todayDate  };
        measures.push(this.measure.create(measure2))
      }
      if(vehicle.sensor3Id){
        const measure3: VehicleMeasure = { company : vehicle.companyId, sensor : vehicle.sensor3Id, value : Math.floor(Math.random() * 1000) + 400, vinId : vehicle.vinId, time : todayDate  };
        measures.push(this.measure.create(measure3))
      }
      return forkJoin(measures);
   }
}
