import { Component, OnInit,Input } from '@angular/core';
import { ThemeService, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss']
})
export class SensorCardComponent implements OnInit {

  @Input() sensorImage : string

  overrides: ChartOptions;
  constructor(private themeService: ThemeService) { 
   
  }

  ngOnInit() {
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
    { data: [330, 600, 260, 700], label: 'Emision C02' },
    { data: [600, 600, 600, 600], label: 'Boundary' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }
}
