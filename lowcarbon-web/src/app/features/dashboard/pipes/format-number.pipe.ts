import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number): any {
    if(value){
      return this.formatNumber(value)
    }
    return value;
  }

  formatNumber(labelValue) {

    // Nine Zeroes for Billions
    if(Math.abs(Number(labelValue)) >= 1.0e+9){
      return Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    }
    if(Math.abs(Number(labelValue)) >= 1.0e+6){
      return Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    }
    if(Math.abs(Number(labelValue)) >= 1.0e+3){
      return Math.abs(Number(labelValue)) / 1.0e+3 + "K"
    }
    return Math.abs(Number(labelValue));
}

}
