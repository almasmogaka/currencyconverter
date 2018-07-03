import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }
  private apiKey = "3aa3c5baaaa8d01dbe2618947b7d2ffd";
  private serverUrl = "http://www.apilayer.net/api";
  
  getRates(): Observable<any> {
    const url = `${this.serverUrl}/live`;
    return this.http.get(url, { params: { access_key: this.apiKey } }).pipe(
      map(res => res));
  } 

  getHistoricalRates(date: string) {
    const url = `${this.serverUrl}/historical`;
    return this.http.get(url, { params: { access_key: this.apiKey, date: date } }).pipe(
      map(hist =>hist));
  }  
  getCurrencies() {
    const url = `${this.serverUrl}/list`;
    return this.http.get(url, { params: { access_key: this.apiKey } }).pipe(
      map(curr =>curr));
  } 

  public getNumber(){
    return 1;
  }
}
