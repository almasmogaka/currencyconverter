import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerInputEvent, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
export const MY_FORMATS = {
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [{
        provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class AppComponent implements OnInit {
    title = "CURRENCY CONVERSION APPLICATION";
    error: any = null;
    fromAmount: number = 1;
    toAmount: any = 0;
    fromCurrency: string = null;
    toCurrency: string = null;
    quotes: Array<any> = [];
    fromRates: Object = {};
    dates: any = new Date();
    currencies: Array<any> = [];  
    planModel: any = { start_time: new Date() };

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.convert();
        this.getcurrencies();
    }
    convert() {
        this.dataService.getRates().subscribe(response => {
            this.prepareRates(response.quotes);

        }, (error) => {
            this.error = 'There was an error: ' + error.status + ' - ' + error.statusText;
        });
    }
    getcurrencies() {
        this.dataService.getCurrencies().
            subscribe(data => {
                if (data['currencies']) {
                    const items: Array<any> = this.parseData(data['currencies']);
                    this.currencies = items;
                    console.log(data['currencies'])
                }
            })
    }
    private parseData(data) {
        const arr: Array<any> = [];
        for (const key in data) {
            if (key) {
                const obj = {
                    id: key,
                    value: data[key]
                };
                arr.push(obj);                
            }            
        }
        return arr;        
    }
    calculate() {
        this.handleErrors();
        if (!this.error) {
            this.toAmount = ((this.fromAmount / this.fromRates[this.fromCurrency] * this.fromRates[this.toCurrency] * 100) / 100).toFixed(2);
        }
    }
    prepareRates(rates) {
        if (rates) {
            const items: Array<any> = this.parseData(rates);
            this.quotes = items;
            this.fromRates = rates;

            this.calculate();
        } else {
            this.error = 'Unable to get data from API';
        }
    }
    private handleErrors() {
        this.error = null;

        if (!this.fromAmount) {
            this.error = 'Please enter the amount';

        }

        if (!this.fromCurrency) {
            this.fromCurrency = this.quotes[0].id;

        }
        if (!this.toCurrency) {
            this.toCurrency = this.quotes[74].id;

        }

        if (this.toCurrency === this.fromCurrency) {
            this.fromAmount = this.toAmount;
            this.error = 'Converting ' + this.toCurrency + ' to ' + this.fromCurrency + ' isn\'t applicaple';
        }
    }
    addEvent(event: MatDatepickerInputEvent<Date>) {
        if (event.value) {
            this.dates = this.formatDate(event.value);
            this.dataService.getHistoricalRates(this.dates).subscribe(response => {
                this.prepareRates(response['quotes']);

            }, (error) => {
                this.error = 'There was an error: ' + error.status + ' - ' + error.statusText;
            });
        }
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}

