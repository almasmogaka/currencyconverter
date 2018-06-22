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
    fromAmount: number = 10;
    toAmount: number = 0;
    fromCurrency: string = null;
    toCurrency: string = null;
    quotes: Array<any> = [];
    fromRates: Object = {};
    dates: any = new Date();   
    planModel: any = {start_time: new Date() };
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.convert(false, true);
    }

    public convert(reverse, initial) {
        this.dataService.getRates(this.fromCurrency).subscribe(response => {
            this.prepareRates(response.quotes, reverse, initial);

        }, (error) => {
            this.error = 'There was an error: ' + error.status + ' - ' + error.statusText;
        });
    }

    public calculate(reverse) {
        this.handleErrors();

        if (!this.error) {
            if (reverse) {
                this.toAmount = (this.toAmount / this.fromRates[this.toCurrency] * 100)/ 100;
            } else {
                this.toAmount = (this.fromAmount/this.fromRates[this.fromCurrency] * this.fromRates[this.toCurrency] * 100)/ 100;

            }
        }
    }

    prepareRates(quotes, reverse, initial) {
        if (quotes) {
            if (initial) {
                const items: Array<any> = this.parseData(quotes);
                this.quotes = items;
                this.fromCurrency = this.quotes[74].id;
                this.toCurrency = this.quotes[10].id;
                this.convert(false, false);
            }

            this.fromRates = quotes;

            this.calculate(reverse);

        } else {
            this.error = 'Unable to get data from API';
        }
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

    private handleErrors() {
        this.error = null;

        if (!this.fromAmount && !this.toAmount) {
            this.error = 'Please enter the amount';
            return;
        }

        if (!this.fromCurrency) {
            this.error = 'Please set currency';
            return;
        }

        if (this.toCurrency === this.fromCurrency) {
            this.fromAmount = this.toAmount;
            this.error = 'Converting ' + this.toCurrency + ' to ' + this.fromCurrency + ' doesn\'t make much sense, does it?';
            return;
        }
    }
    addEvent(event: MatDatepickerInputEvent<Date>) {
        if (event.value) {
            this.dates = this.formatDate(event.value);
            this.dataService.getHistoricalRates(this.dates).subscribe(response => {
                this.prepareRates(response.quotes, false, true);
    
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

