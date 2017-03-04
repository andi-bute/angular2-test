import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SliderModule} from 'primeng/primeng';

import { AppComponent } from './app.component';

import { UploadXlsxComponent } from './uploadxlsx/uploadxlsx.component';
import { ServerListComponent } from './server-list/server-list.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    SliderModule
  ],
  declarations: [
    AppComponent,
    UploadXlsxComponent,
    ServerListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
