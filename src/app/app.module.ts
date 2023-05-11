import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({}),
    DataTablesModule,
    HttpClientModule,
    // NgbModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: 'rgb(92, 101, 223)',
      switchColor: 'rgb(92, 101, 223)',
      defaultBgColor: 'white',
      defaultBoColor : 'rgb(92, 101, 223)',
      checkedLabel: 'Si',
      uncheckedLabel: 'No'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
