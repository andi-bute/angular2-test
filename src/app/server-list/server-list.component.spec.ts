/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServerListComponent } from '../server-list/server-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2BootstrapModule} from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import {SliderModule} from 'primeng/primeng';

describe('ServerListComponent', () => {
  let component: ServerListComponent;
  let fixture: ComponentFixture<ServerListComponent>;

  let mockServers = {
    "result":"success",
    "payload":[
      {
        "ServerName":"HP DL120G5/Intel E2160",
        "Processor":"1x Intel Dual-Core E2160",
        "RAM":"2GB DDR2",
        "Storage":"2x250GB SATA2",
        "Price":29,
        "RAM_GB":"2, 4, 8",
        "Storage_GB":"500, 1000, 2000, 4000",
        "HarddiskType":"SAS",
        "hddSizes":[500,1000,2000,4000],
        "ramSizes":[2,4,8],
        "hddTypes":["SAS"]
      },
      {
        "ServerName":"HP DL120G5/Intel E2160",
        "Processor":"1x Intel Dual-Core E2160",
        "RAM":"2GB DDR2",
        "Storage":"2x250GB SATA2",
        "Price":29,
        "RAM_GB":"2, 4, 8",
        "Storage_GB":"500, 1000, 2000, 4000",
        "HarddiskType":"SAS",
        "hddSizes":[1000,2000,4000],
        "ramSizes":[8],
        "hddTypes":["SSD"]
      },
  ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServerListComponent
      ],
      imports: [
        FormsModule,
        TabsModule.forRoot(),
        SliderModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerListComponent);
    component = fixture.componentInstance;
    component.xlsx = {result: "success", payload:[]};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all results', () => {
    component.xlsx = mockServers;
    component.filterResults();
    const compiled = fixture.debugElement.nativeElement;
    expect(component.filteredServers.length).toEqual(2);
  });
  it('filter by ram', () => {
    component.xlsx = mockServers;
    component.filters.ramSize = [4];
    component.filterResults();
    expect(component.filteredServers.length).toEqual(1);
  });
  it('filter by ram out of range', () => {
    component.xlsx = mockServers;
    component.filters.ramSize = [100];
    component.filterResults();
    expect(component.filteredServers.length).toEqual(0);
  });
  it('filter by harddisk type', () => {
    component.xlsx = mockServers;
    component.filters.hddType = "SSD";
    component.filterResults();
    expect(component.filteredServers.length).toEqual(1);
  });
  it('filter by harddisk type bad input', () => {
    component.xlsx = mockServers;
    component.filters.hddType = "fooBar";
    component.filterResults();
    expect(component.filteredServers.length).toEqual(0);
  });

  it('filter by harddisk size', () => {
    component.xlsx = mockServers;
    component.filters.hddSizeFilter = [250, 500];
    component.filterResults();
    expect(component.filteredServers.length).toEqual(1);
  });
  it('filter by harddisk size no match', () => {
    component.xlsx = mockServers;
    component.filters.hddSizeFilter = [48000, 72000];
    component.filterResults();
    expect(component.filteredServers.length).toEqual(0);
  });
  it('filter by harddisk size out of range', () => {
    component.xlsx = mockServers;
    component.filters.hddSizeFilter = [90000, 100000];
    component.filterResults();
    expect(component.filteredServers.length).toEqual(0);
  });

});
