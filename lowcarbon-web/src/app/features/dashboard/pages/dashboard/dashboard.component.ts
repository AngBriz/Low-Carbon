import { Component, OnInit } from '@angular/core';
import { MeasuresService } from 'src/app/shared/shared-services/measures/measures.service';
import { Observable } from 'rxjs';
import { ChartOptions } from 'chart.js';
import { ThemeService } from 'ng2-charts';
import { map, tap, count } from 'rxjs/operators';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/shared-services/vehicle/vehicle.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  measuresSum$: Observable<any>;
  measures$: Observable<any>;
  carCount$: Observable<number>;

  overrides: ChartOptions;
  chartData = []
  chartLabels = []
  model : any; 

  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  gaugeType = "arch";
  gaugeValue = 28.3;
  gaugeLabel = "CO2";
  gaugeAppendText = "ppm";


  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  placeholder = 'starting today';
   
  chartOptions = {
    responsive: true
  };

  constructor(private measuerService : MeasuresService,private themeService: ThemeService,private calendar: NgbCalendar, private vehicleService : VehicleService) { }

  ngOnInit() {
    this.overrides = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' },
          
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
    this.themeService.setColorschemesOptions(this.overrides)

    this.chartData = [
      { data: [], label: '' },
    ];

    this.carCount$ = this.vehicleService.get().pipe(
      map(o => o.length)
    )

    this.onDateRangeSelection({ from : this.defaultFrom, to: this.defaultTo });
  }






  onChartClick(event) {
    console.log(event);
  }

  groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  defaultTo = new Date();
  actualDate = new Date()
  defaultFrom = new Date(this.actualDate.setMonth(this.actualDate.getMonth()-1));

  public onDateRangeSelection(range: { from: Date, to: Date }) {
    this.measuresSum$ = this.measuerService.getSumMeasuresByCompany(environment.demo_company, range.from.toISOString(), range.to.toISOString() )

    this.measuerService.getValuesMeasuresByCompany(environment.demo_company,range.from.toISOString(),range.to.toISOString()).subscribe(
      o => {
        this.chartData = []
        this.chartLabels = []
        for (let index = 0; index < o.results[0].series.length; index++) {
          const data = { data: [], label: o.results[0].series[index].tags["vinId"] };
          o.results[0].series[index].values.forEach(o => data.data.push(o[1]))
          o.results[0].series[index].values.forEach(o => { 
                let date = new Date(o[0]).toLocaleString('en-GB', { timeZone: 'UTC' })
                if(!this.chartLabels.includes(date)){
                  this.chartLabels.push(date)
                }
             })
          this.chartData.push(data)
        }
      }
    )
    console.log(`Selected range: ${range.from.toISOString()} - ${range.to.toISOString()}`);
  }


  
  datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}




}

