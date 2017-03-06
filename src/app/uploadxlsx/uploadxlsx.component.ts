import { ChangeDetectionStrategy, ChangeDetectorRef, Output, ElementRef, EventEmitter, Component, OnDestroy, OnInit } from '@angular/core';
import {utils, read, IWorkBook} from "ts-xlsx";
import {IWorkSheet} from "xlsx";
import {Observable, Subject, Subscription} from "rxjs";

export interface UploadResult {
  result: "failure" | "success";
  payload: any;
}

@Component({
  selector: 'uploadxlsx',
  templateUrl: './uploadxlsx.html'
})
export class UploadXlsxComponent {
  private filesSubject: Subject<File>;
  private _uploadedXls: Observable<{ result: string, payload: any }>;
  private subscription: Subscription;
  public uploadedXls;
  constructor(private ref: ChangeDetectorRef) {}

  fileChange($event: any) {
    let self = this;
    var myReader:FileReader = new FileReader();
    var file:File = $event.target.files[0];
    myReader.readAsBinaryString(file);
    myReader.onloadend = function(e){
      let wb: IWorkBook = read(myReader.result, {type: 'binary'});
      let sheet: IWorkSheet = wb.Sheets["Data"];
      let parsedSheet = processSheet(sheet);
      self.uploadedXls = {result: "success", payload: prepareForFilters(parsedSheet)};
      self.ref.detectChanges();
    }
    //Function to help keep filterable data handy
    function prepareForFilters(parsedSheet){
      for(let row = 0; row < parsedSheet.length; row++) {
        let hdd = parsedSheet[row]['Storage_GB'];
        hdd = hdd.split(", ").map(function(size){
          return parseInt(size)
        });
        parsedSheet[row].hddSizes = hdd;
        let ram = parsedSheet[row]['RAM_GB'];
        ram = ram.split(", ").map(function(size){
          return parseInt(size)
        });
        parsedSheet[row].ramSizes = ram;
        let hddTypes = parsedSheet[row]['HarddiskType'].split(", ");
        parsedSheet[row].hddTypes = hddTypes;
      }
      return parsedSheet;
    }
    function processSheet(sheet) {
      const columns = {"A": "ServerName", "B": "Processor", "C": "RAM", "D": "Storage", "E": "Price", "F": "RAM_GB", "G": "Storage_GB", "H": "HarddiskType"};
      //asuming xlsx always has max length to H column
      let maxRows = parseInt(sheet["!ref"].substr(sheet["!ref"].indexOf("H")+1, sheet["!ref"].length));
      //start off from the produc listing
      let rowsData = [];
      for(let row = 3; row < maxRows-1; row++) {
        let rowData = {};
        for(let column in columns) {
          //make sure we skip empty rows
          if(sheet[column+row]){
            rowData[columns[column]] = sheet[column+row].v;
            if(column === "H" && sheet[column+row].v) {
              rowsData.push(rowData);
            }
          }
        }
      }
      return rowsData;
    }
  }
}
