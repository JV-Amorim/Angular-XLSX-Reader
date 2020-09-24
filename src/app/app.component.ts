import { Component } from '@angular/core';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-XLSX-Reader';
  file: File;
  arrayBuffer: any;
  filelist: any;

  data: any[];

  constructor() { }

  addfile(event): void {
    this.file= event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = e => this.onload(fileReader);
  }

  getObjectKeys(object: any): string[] {
    return Object.keys(object);
  }

  getObjectValues(object: any): any[] {
    return Object.values(object);
  }

  private onload(fileReader: FileReader): void {
    this.arrayBuffer = fileReader.result;
    const data = new Uint8Array(this.arrayBuffer);

    const arr = new Array();
    for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);

    const bstr = arr.join("");
    const workbook = XLSX.read(bstr, {type:"binary"});
    const first_sheet_name = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[first_sheet_name];

    const arraylist = XLSX.utils.sheet_to_json(worksheet, {raw:true});
    console.log(arraylist);
    this.data = arraylist;

    this.filelist = [];
    console.log(this.filelist);
  }
}