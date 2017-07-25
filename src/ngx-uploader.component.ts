import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ViewChild} from '@angular/core';
import { UploaderService } from './uploader.service';
import { iAppend } from './iAppend';

@Component({
  selector: 'ngx-uploader-component',
  template: `
  <div class="file">
    <div class="notImage"  *ngIf="percentComplete === 0">
      <input type="file" class="file-input" #fileInput
      (dragleave)="drop(false)"
      (dragenter)="drop(true)"
      (change)="uploader()"
      />
      <div class="textFileContainer" *ngIf="!isDrop">
        <span class="fileTitle">Upload</span> <br />
        <span class="fileRecommend">Recommended minimum 100x100px</span>
      </div>
      <div class="textFileContainer" *ngIf="isDrop">
        <span class="fileTitle">drop here</span>
      </div>
    </div>
    <span *ngIf="percentComplete > 0 && !canSave">
      <img [src]="fileName" class="img-demo" />
      <span class="logo-name"> {{fileName}} </span>
      <button class="remove"> - </button>
    </span>
    <span *ngIf="percentComplete > 0 && canSave"> Uploading </span>
</div>`,
  styles: [`
   md-dialog-container {
  background: white;
}
.mat-dialog-container {
    background: white!important;
}

app-new-channel {
  background: white;
}
.file {
  border-style: dashed;
  width: 500px;
  height: 100px;
  background-color: gold;
}

.file-input {
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 999999;
  opacity: 0;
}

.fileTitle {
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 22px;
  font-weight: 800;
}

.textFileContainer {
    width: 100%;
    text-align: center;
    padding-top: 18px;
}

.inputName {
  width: 100%;
  height: 27px;
  font-size: 16px;
}

.inputColor {
  width: 40%;
  height: 20px;
  font-size: 16px;
  margin-left: -4px;
}

.img-demo {
  width: 100px;
  padding: 10px;
  float: left;
  height: 70px;
}

.logo-name{
  float: left;
  width: 50%;
  overflow: hidden;
}

.remove {
  float: left;
  border-radius: 50%;
}
 
  `]
})
export class NgxUploaderComponent {

  file: any = {};
  canSave: boolean = true;
  imageUpload: string;
  percentComplete: number = 0;
  percentUpload: any;
  @ViewChild('fileInput') fileInput;
  isDrop = false;
  fileName: string;

  @Input() token: string = '';
  @Input() urlBackend: string = 'http://localhost:8080/api/file/';
  @Input() appends: Array<iAppend>;

  constructor(private uploaderService: UploaderService) {
  }

  drop(v: boolean) {
    this.isDrop = v;
  }

  uploader() {
    this.uploaderService.unsubscribeSubjects();
    this.drop(false);
    this.fileName = this.fileInput.nativeElement.value.replace('C:\\fakepath\\', '');
    this.uploaderService.createSubjects();

    this.uploaderService.percentUpload$.subscribe({
      next: (v) =>  this.percentComplete = v
    });
    this.uploaderService.nameUpload$.subscribe({
      next: (v) => this.fileName = v
    });
    this.uploaderService.isUpload$.subscribe({
      next: (v) => this.canSave = v
    });

    this.uploaderService.uploadXHR(this.fileInput.nativeElement, this.token, this.appends, this.urlBackend);
  }

}
