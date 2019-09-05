import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from 'src/app/shared/shared-services/vehicle/models/vehicle';
import { Observable } from 'rxjs';
import { filter, find, mergeMap } from 'rxjs/operators';
@Pipe({
  name: 'vehicleChasis'
})
export class VehicleChasisPipe implements PipeTransform {

  transform(value: Vehicle[], term: string ): any {
      if (term){
        return value.filter(o => o.vinId.includes(term))
      }
      return value;
  }

}
