import { DataService } from './data.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
describe('Data service', () => {
    let dataservice: DataService;
   
    beforeEach(() => {
        
        TestBed.configureTestingModule({ 
            imports: [HttpModule],
             providers: [DataService] 
            });
    });
    it('It should return 1 when getNumber is called', () => {
        dataservice = TestBed.get(DataService);
        expect(dataservice.getNumber()).toBe(1);
    });
    it('It should return Observeble object<quotes>', inject([DataService], (dataservice: DataService) => {
        expect(dataservice).toBeTruthy();
        }),
    );
    
});