import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { iAppend } from './iAppend';

@Injectable()
export class UploaderService {

  percentComplete: number;
  percentUpload$: any;
  nameUpload$: any;
  isUpload$: any;

  constructor() { }

  createSubjects() {
    this.percentUpload$ = new BehaviorSubject(0);
    this.nameUpload$ = new BehaviorSubject('');
    this.isUpload$ = new BehaviorSubject(false);
  }

  unsubscribeSubjects() {
    if (this.percentUpload$ !== undefined) {
      this.percentUpload$.unsubscribe();
      this.nameUpload$.unsubscribe();
      this.isUpload$.unsubscribe();
    }
  }

   uploadXHR(file: any, token: string = '', appends: Array<iAppend>, urlBackend: string) {
    this.isUpload$.next(true);
    const files = file.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
    }
    if (appends !==  undefined ) {
      appends.forEach(element => {
        // formData.append('path', 'environment.urlS3ImagePath');
        formData.append(element.name, element.value);
      });
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', urlBackend, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        this.percentComplete = (e.loaded / e.total) * 100;
        console.log(this.percentComplete + '% uploaded');
        this.percentUpload$.next(this.percentComplete);
      }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            this.setImageUrl(xhr.responseText);
        } else {
            alert('An error occurred!');
        }
        this.isUpload$.next(false);
    };
    if (token !== '') {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    xhr.send(formData);
  }

  setImageUrl(xhrResponse: any) {
    console.log(xhrResponse);
    this.nameUpload$.next( xhrResponse );
  }

}
