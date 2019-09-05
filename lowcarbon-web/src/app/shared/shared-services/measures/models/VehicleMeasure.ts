export interface VehicleMeasure {
    time? : Date,
    company : string,
    sensor : string,
    value : number,
    vinId : string;
}

export interface Series {
    name: string;
    tags : {}
    columns: string[];
    values: any[][];
}

export interface Result {
    statement_id: number;
    series: Series[];
}

export interface Measure {
    results: Result[];
}