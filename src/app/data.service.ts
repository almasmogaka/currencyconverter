import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  private apiKey = "3aa3c5baaaa8d01dbe2618947b7d2ffd";
  private serverUrl = "http://www.apilayer.net/api";
  
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
  public getlist() {
    const url = `${this.serverUrl}/list`;
    return this.http.get(url, { params: { access_key: this.apiKey } }).pipe(
      map((res: Response) => {
        return <any>res.json();
      }))
  }

  public getNumber(){
    return 1;
  }
}
