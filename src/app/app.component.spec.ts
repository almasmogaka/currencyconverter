import { AppComponent } from "./app.component";
import { DataService } from "./data.service";
import { TestBed } from "@angular/core/testing";

class MockDataService {
    fromAmount = 10;
    
}

describe('App component', () => {
    
    beforeEach(() => {
        let dataservice: DataService;
        
        TestBed.configureTestingModule({
          // provide the component-under-test and dependent service
          providers: [
            AppComponent,
            { provide: DataService, useClass: MockDataService }
          ]
        });       
        dataservice = TestBed.get(DataService);
      });
});