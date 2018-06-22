import { AppComponent } from "./app.component";
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect, async } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatRippleModule, MatNativeDateModule } from "@angular/material";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataService } from "./data.service";
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { Observable } from "rxjs";
import 'rxjs/add/observable/from';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let De: DebugElement;
  let dataservice: DataService;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [DataService,
        { provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [
        BrowserModule,
        MatFormFieldModule,
        HttpModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        MatRippleModule, 
        MatDatepickerModule,
        MatNativeDateModule
   
      ]
    }).compileComponents();

  }));
  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    De=fixture.debugElement.query(By.css('table'));
    dataservice = new DataService(null);
    component = new AppComponent(dataservice);

  })
  
    
  it('should create', () => {
    //expect(component).toBeDefined();
  });
  it('should display the Title"CURRENCY CONVERSION APPLICATION" ', () => {  
    const appDe= fixture.debugElement.componentInstance;       
    expect(appDe.title).toEqual('CURRENCY CONVERSION APPLICATION');
  });
  it('should render the Title in h4 tag', () => {  
    const appDe: DebugElement = fixture.debugElement;
    const headingDe =appDe.query(By.css('h4')); 
    const h4: HTMLElement = headingDe.nativeElement;    
    expect(h4.textContent).toBe('CURRENCY CONVERSION APPLICATION');
  });
  it('should have a default amount = 10',async( () => {
    expect(component.fromAmount).toEqual(10);
  })); 
  it('should get api data',async( () => {
    let rates = ({});
    spyOn(dataservice, 'getRates').and.callFake(() => {
      return Observable.from([rates]);
    });
    component.fromRates
    expect(component.fromRates).toEqual(rates);
  }));
});