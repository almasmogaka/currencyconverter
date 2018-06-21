import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RatesInterface } from './rates-interface';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  private apiKey = "ac7638591d8491c0dac63f3f5aa3c750";
  private apiKey2 = "0622e72efb6f80aafdf7dacb782fc243";
  private serverUrl = "http://www.apilayer.net/api";
  private serverUrl2 = "http://data.fixer.io/api";
  
  public getRates(source): Observable<any> {
    const url = `${this.serverUrl}/live`;
    const url2 = `${this.serverUrl2}/latest`;
    return this.http.get(url2, { params: { access_key: this.apiKey2 } }).pipe(
      map((response: Response) => {
        return <any>response.json();
      }))
  }

  public getHistoricalRates(date: string) {
    const url = `${this.serverUrl}/historical`;
    const url2 = `${this.serverUrl2}/2013-12-24`;
    return this.http.get(url2, { params: { access_key: this.apiKey2, date: date } }).pipe(
      map((res: Response) => {
        return <any>res.json();
      }))
  }

  public getNumber(){
    return 1;
  }
}
