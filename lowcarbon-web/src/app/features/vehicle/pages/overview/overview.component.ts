import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/shared/shared-services/vehicle/models/vehicle';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  vehicles$: Observable<Vehicle[]>;
  chasisFilter: string;
  constructor(private vehicleService : VehicleService) { }

  ngOnInit() {
    this.vehicles$ = this.vehicleService.get();
  }


  _opened: boolean = false;
 
  _toggleSidebar() {
    this._opened = !this._opened;
  }

  randomColorCar(){
    return `grayscale(${Math.floor(Math.random() * 1000) + 1}) brightness(${Math.floor(Math.random() * 1.1) + 1})`;
  }
}
