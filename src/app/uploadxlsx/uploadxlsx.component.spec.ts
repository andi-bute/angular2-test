/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadXlsxComponent } from './uploadxlsx.component';
import { ServerListComponent } from '../server-list/server-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap';
import {SliderModule} from 'primeng/primeng';

describe('UploadXlsxComponent', () => {
  let component: UploadXlsxComponent;
  let fixture: ComponentFixture<UploadXlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadXlsxComponent,
        ServerListComponent
      ],
      imports: [
        FormsModule,
        TabsModule,
        SliderModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  //TODO: Need to figure out end-to-end testing and manage to upload a file, or stub uploading
});
