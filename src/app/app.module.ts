import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NoopAnimationsModule} from "@angular/platform-browser/animations";

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from "@angular/material/toolbar";

import { StartScreenComponent } from './start-screen/component/start-screen.component';
import { PagenotfoundComponent } from './page-not-found/pagenotfound.component';
import { TouractComponent } from './tour-act/component/touract.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    PagenotfoundComponent,
    TouractComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,

    NoopAnimationsModule,

    MatListModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatIconModule
  ],
  providers: [],
  entryComponents: [TouractComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
