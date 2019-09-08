import { Component, OnInit, Input } from '@angular/core';
import { ThemeService, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Vehicle } from 'src/app/shared/shared-services/vehicle/models/vehicle';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input()data : Vehicle
  position : string | number;
  overrides: ChartOptions;
  imageCar : string

  constructor(private themeService: ThemeService) { 
    
  }
  nameof = <T>(name: keyof T) => name;
  ngOnInit() {
    this.getImage()

    
     if(!this.data.sensor1Id){
       this.position = "sensor1Id"
     }
     else if(!this.data.sensor2Id){
      this.position = "sensor2Id"
    }
    else if(!this.data.sensor3Id){
      this.position = "sensor3Id"
    }

    this.overrides = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
    this.themeService.setColorschemesOptions(this.overrides)
  }


  _opened: boolean = false;
 
  _toggleSidebar() {
    this._opened = !this._opened;
  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Sensor 1' },
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  createSensor(){
    
  }

  getImage()
  {
    let images = [
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-suv.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-mpv.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-convertible.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-estate.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-coupe.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-pickup.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-hatchback.svg",
      "https://www.autotrader.co.uk/images/at-common/body-types/icon-saloon.svg",
    ]
    let index = Math.floor(Math.random() * images.length);
    this.imageCar = images[index]
  }


}
