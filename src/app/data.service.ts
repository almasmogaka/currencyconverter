import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RatesInterface } from './rates-interface';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  private currenciesUrl="http://www.apilayer.net/api/live?access_key=ac7638591d8491c0dac63f3f5aa3c750&format=1";

  getRates(): Observable<RatesInterface[]> {
    return this.http.get(this.currenciesUrl)
    .pipe(map((response: Response) => {
      return <RatesInterface[]>response.json();
    }))
  }
}
