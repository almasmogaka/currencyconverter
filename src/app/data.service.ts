import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RatesInterface } from './rates-interface';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  private apiKey = "ac7638591d8491c0dac63f3f5aa3c750";
  private serverUrl = "http://www.apilayer.net/api";
  //private ratesUrl = "http://www.apilayer.net/api/live?access_key=ac7638591d8491c0dac63f3f5aa3c750";
  //private datesUrl = "http://apilayer.net/api/historical?access_key=ac7638591d8491c0dac63f3f5aa3c750&date=2018-06-10";

  public getRates(source): Observable<any> {
    const url = `${this.serverUrl}/live`;
    return this.http.get(url, { params: { access_key: this.apiKey } }).pipe(
      map((response: Response) => {
        return <any>response.json();
      }))
  }

  public getHistoricalRates(date: string) {
    const url = `${this.serverUrl}/historical`;
    return this.http.get(url, { params: { access_key: this.apiKey, date: date } }).pipe(
      map((res: Response) => {
        return <any>res.json();
      }))
  }

  public getNumber(){
    return 1;
  }
}
