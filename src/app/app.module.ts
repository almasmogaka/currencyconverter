import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { StringPipesModule } from 'ngx-custom-pipes'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatRippleModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { CharstrimPipe } from './charstrim.pipe';

@NgModule({
  declarations: [       
    AppComponent, CharstrimPipe
  ],
  imports: [
    BrowserModule,    
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatRippleModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    StringPipesModule,
    MatButtonModule, MatCheckboxModule    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
