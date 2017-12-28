import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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
        <span class="fileTitle">{{textUpload}}</span> <br />
        <span class="fileRecommend">{{recommend}}</span>
      </div>
      <div class="textFileContainer" *ngIf="isDrop">
        <span class="fileTitle">{{textDrop}}</span>
        <span class="fileRecommend">{{recommend}}</span>
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
  width: 100%;
  min-height: 50px;
}

.file-input {
  width: 100%;
  min-height: 50px;
  max-height: 100%;
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
  max-width: 100%;
  max-height: 100%;
  padding: 10px;
  float: left;
  
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
export class NgxUploaderComponent implements OnDestroy {

  file: any = {};
  canSave: boolean = true;
  imageUpload: string;
  percentComplete: number = 0;
  percentUpload: any;
  @ViewChild('fileInput') fileInput;
  isDrop = false;
  fileName: string;


  @Input() textUpload: string = 'Upload';
  @Input() recommend: string = 'Recommend minimum size 100x100px';
  @Input() textDrop: string = 'Drop Here';
  @Input() token: string = '';
  @Input() urlBackend: string = 'http://localhost:8080/api/file/';
  @Input() appends: Array<iAppend>;

  constructor(private uploaderService: UploaderService) {
  }

  ngOnDestroy() {
    this.uploaderService.unsubscribeSubjects();
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
