import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AtdlFormComponent } from './atdl-form.component'

@NgModule({
  declarations: [
    AtdlFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AtdlFormComponent]
})
export class AppModule { }
