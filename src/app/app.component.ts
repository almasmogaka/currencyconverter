import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { RatesInterface } from './rates-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  
  constructor(private dataService: DataService) { }

  currenciesdata: RatesInterface[];

  showsource(): void {
    this.dataService.getRates()
      .subscribe(resultdata => this.currenciesdata=resultdata)
  }

  ngOnInit(){
    this.showsource();
  }
  
  
}
