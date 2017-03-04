import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation} from "@angular/core";
import { UploadResult } from '../uploadxlsx/uploadxlsx.component';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare var _;

@Component({
  selector: 'server-list',
  templateUrl: './server-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

export class ServerListComponent {

  @Input() xlsx: any;

  public filteredServers = [];
  public filters = {
    ramSize: [],
    hddType: "",
    hddSize: [0, 100],
    hddSizeFilter:[0, 250, 500, 1000, 2000, 3000, 4000, 8000, 12000, 24000, 48000, 72000]
  };
  public harddiskTypes = [
    {value: "", display: "All"},
    {value: "SAS", display: "SAS"},
    {value: "SATA", display: "SATA"},
    {value: "SSD", display: "SSD"}
  ];
  public ramSizes = [
    {value: 2, display: "2GB", checked: false},
    {value: 4, display: "4GB", checked: false},
    {value: 8, display: "8GB", checked: false},
    {value: 12, display: "12GB", checked: false},
    {value: 16, display: "16GB", checked: false},
    {value: 24, display: "24GB", checked: false},
    {value: 32, display: "32GB", checked: false},
    {value: 48, display: "48GB", checked: false},
    {value: 64, display: "64GB", checked: false},
    {value: 96, display: "96GB", checked: false}
  ];
  public hddSizesDisplay = ["0", "250GB", "500GB", "1TB", "2TB", "3TB", "4TB", "8TB", "12TB",  "24TB", "48TB", "72TB"];
  public hddSizesFilter = [0, 250, 500, 1000, 2000, 3000, 4000, 8000, 12000, 24000, 48000, 72000];
  public hddSizeSelected = {min:"0", max: "72TB"}
  constructor(private ref: ChangeDetectorRef) {
    if(this.xlsx && this.xlsx.result === "success") {
        this.filteredServers = this.xlsx.payload;
    }

  }
  ngOnInit() {
    this.filterResults();
  }
  updateRamSizes($event) {
    let self = this;
    this.filters.ramSize = [];
    this.ramSizes.forEach(function(ramSize){
      if(ramSize.checked) {
        self.filters.ramSize.push(ramSize.value);
      }
    });
    this.filterResults();
  }
  updateHddType($event) {
    this.filterResults();
  }
  updateHddSize($event) {
    let result = this.convertPercentageToHddSize(this.filters.hddSize);
    this.hddSizeSelected.min = result.display.min;
    this.hddSizeSelected.max = result.display.max;
    //a.splice(a.indexOf(4),a.indexOf(16)-a.indexOf(4)+1)
    let spliceStart = this.hddSizesFilter.indexOf(result.filter.min);
    let spliceEnd = this.hddSizesFilter.indexOf(result.filter.max)-this.hddSizesFilter.indexOf(result.filter.min)+1;
    let spliceable = _.clone(this.hddSizesFilter)
    console.log("spliceStart", spliceStart);
    console.log("spliceEnd", spliceEnd);
    console.log("this.hddSizesFilter", this.hddSizesFilter);
    this.filters.hddSizeFilter = spliceable.splice(spliceStart, spliceEnd);
    this.filterResults();
  }

  convertPercentageToHddSize(pct) {
    let result = {display: {min: "0", max: "72TB"}, filter: {min: 0, max: 72000}};
    //min
    if( pct[0] === 5 ) {
      result.display.min = this.hddSizesDisplay[1];
      result.filter.min = this.hddSizesFilter[1];
    } else if( pct[0] === 10 ) {
      result.display.min = this.hddSizesDisplay[2];
      result.filter.min = this.hddSizesFilter[2];
    } else if(pct[0] > 10){
        let sizeIndex = Math.ceil(pct[0]/10)+1;
        result.display.min = this.hddSizesDisplay[sizeIndex];
        result.filter.min = this.hddSizesFilter[sizeIndex];
    }

    //max
    if( pct[1] === 5 ) {
      result.display.max = this.hddSizesDisplay[1];
      result.filter.max = this.hddSizesFilter[1];
    } else if( pct[1] === 10 ) {
      result.display.max = this.hddSizesDisplay[2];
      result.filter.max = this.hddSizesFilter[2];
    } else if(pct[1] > 10){
        let sizeIndex = Math.ceil(pct[1]/10)+1;
        result.display.max = this.hddSizesDisplay[sizeIndex];
        result.filter.max = this.hddSizesFilter[sizeIndex];
    }
    return result;
  }

  filterResults() {
    let self = this;
    this.filteredServers = [];
    this.xlsx.payload.forEach(function(server){
      let match = true;
      if(self.filters.hddType && !server.hddTypes.includes(self.filters.hddType)) {
        match = false;
      }
      if(self.filters.ramSize.length && _.intersection(server.ramSizes, self.filters.ramSize).length != self.filters.ramSize.length) {
        match = false;
      }
      if(self.filters.hddSizeFilter.length && !_.intersection(server.hddSizes, self.filters.hddSizeFilter).length) {
        match = false;
      }

      if(match) {
        self.filteredServers.push(server);
      }

    });
    console.log(this.filters);
  }
}
