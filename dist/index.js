import { Component, Injectable, Input, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UploaderService = (function () {
    function UploaderService() {
    }
    /**
     * @return {?}
     */
    UploaderService.prototype.createSubjects = /**
     * @return {?}
     */
    function () {
        this.percentUpload$ = new BehaviorSubject$1(0);
        this.nameUpload$ = new BehaviorSubject$1('');
        this.isUpload$ = new BehaviorSubject$1(false);
    };
    /**
     * @return {?}
     */
    UploaderService.prototype.unsubscribeSubjects = /**
     * @return {?}
     */
    function () {
        if (this.percentUpload$ !== undefined) {
            this.percentUpload$.unsubscribe();
            this.nameUpload$.unsubscribe();
            this.isUpload$.unsubscribe();
        }
    };
    /**
     * @param {?} file
     * @param {?} token
     * @param {?} appends
     * @param {?} urlBackend
     * @return {?}
     */
    UploaderService.prototype.uploadXHR = /**
     * @param {?} file
     * @param {?} token
     * @param {?} appends
     * @param {?} urlBackend
     * @return {?}
     */
    function (file, token, appends, urlBackend) {
        var _this = this;
        this.isUpload$.next(true);
        var /** @type {?} */ files = file.files;
        var /** @type {?} */ formData = new FormData();
        for (var /** @type {?} */ i = 0; i < files.length; i++) {
            formData.append('file', files[i], files[i].name);
        }
        if (appends !== undefined) {
            appends.forEach(function (element) {
                formData.append(element.name, element.value);
            });
        }
        var /** @type {?} */ xhr = new XMLHttpRequest();
        xhr.open('POST', urlBackend, true);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                _this.percentComplete = (e.loaded / e.total) * 100;
                console.log(_this.percentComplete + '% uploaded');
                _this.percentUpload$.next(_this.percentComplete);
            }
        };
        xhr.onload = function () {
            if (xhr.status === 200) {
                _this.setImageUrl(xhr.responseText);
            }
            else {
                alert('An error occurred!');
            }
            _this.isUpload$.next(false);
        };
        if (token !== '') {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
        xhr.send(formData);
    };
    /**
     * @param {?} xhrResponse
     * @return {?}
     */
    UploaderService.prototype.setImageUrl = /**
     * @param {?} xhrResponse
     * @return {?}
     */
    function (xhrResponse) {
        console.log(xhrResponse);
        this.nameUpload$.next(xhrResponse);
    };
    UploaderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UploaderService.ctorParameters = function () { return []; };
    return UploaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxUploaderComponent = (function () {
    function NgxUploaderComponent(uploaderService) {
        this.uploaderService = uploaderService;
        this.file = {};
        this.canSave = true;
        this.percentComplete = 0;
        this.isDrop = false;
        this.textUpload = 'Upload';
        this.recommend = 'Recommend minimum size 100x100px';
        this.textDrop = 'Drop Here';
        this.token = '';
        this.urlBackend = 'http://localhost:8080/api/file/';
    }
    /**
     * @return {?}
     */
    NgxUploaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.uploaderService.unsubscribeSubjects();
    };
    /**
     * @param {?} v
     * @return {?}
     */
    NgxUploaderComponent.prototype.drop = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.isDrop = v;
    };
    /**
     * @return {?}
     */
    NgxUploaderComponent.prototype.uploader = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.uploaderService.unsubscribeSubjects();
        this.drop(false);
        this.fileName = this.fileInput.nativeElement.value.replace('C:\\fakepath\\', '');
        this.uploaderService.createSubjects();
        this.uploaderService.percentUpload$.subscribe({
            next: function (v) { return _this.percentComplete = v; }
        });
        this.uploaderService.nameUpload$.subscribe({
            next: function (v) { return _this.fileName = v; }
        });
        this.uploaderService.isUpload$.subscribe({
            next: function (v) { return _this.canSave = v; }
        });
        this.uploaderService.uploadXHR(this.fileInput.nativeElement, this.token, this.appends, this.urlBackend);
    };
    NgxUploaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-uploader-component',
                    template: "\n  <div class=\"file\">\n    <div class=\"notImage\"  *ngIf=\"percentComplete === 0\">\n      <input type=\"file\" class=\"file-input\" #fileInput\n      (dragleave)=\"drop(false)\"\n      (dragenter)=\"drop(true)\"\n      (change)=\"uploader()\"\n      />\n      <div class=\"textFileContainer\" *ngIf=\"!isDrop\">\n        <span class=\"fileTitle\">{{textUpload}}</span> <br />\n        <span class=\"fileRecommend\">{{recommend}}</span>\n      </div>\n      <div class=\"textFileContainer\" *ngIf=\"isDrop\">\n        <span class=\"fileTitle\">{{textDrop}}</span> <br />\n        <span class=\"fileRecommend\">{{recommend}}</span>\n      </div>\n    </div>\n    <span *ngIf=\"percentComplete > 0 && !canSave\">\n      <img [src]=\"fileName\" class=\"img-demo\" />\n      <span class=\"logo-name\"> {{fileName}} </span>\n      <button class=\"remove\"> - </button>\n    </span>\n    <span *ngIf=\"percentComplete > 0 && canSave\"> Uploading </span>\n</div>",
                    styles: ["\n   md-dialog-container {\n  background: white;\n}\n.mat-dialog-container {\n    background: white!important;\n}\n\napp-new-channel {\n  background: white;\n}\n.file {\n  border-style: dashed;\n  width: 100%;\n  min-height: 50px;\n}\n\n.file-input {\n  width: 100%;\n  min-height: 50px;\n  max-height: 100%;\n  position: absolute;\n  z-index: 999999;\n  opacity: 0;\n}\n\n.fileTitle {\n  width: 100%;\n  padding: 10px;\n  text-align: center;\n  font-size: 22px;\n  font-weight: 800;\n}\n\n.textFileContainer {\n    width: 100%;\n    text-align: center;\n    padding-top: 18px;\n}\n\n.inputName {\n  width: 100%;\n  height: 27px;\n  font-size: 16px;\n}\n\n.inputColor {\n  width: 40%;\n  height: 20px;\n  font-size: 16px;\n  margin-left: -4px;\n}\n\n.img-demo {\n  max-width: 100%;\n  max-height: 100%;\n  padding: 10px;\n  float: left;\n  \n}\n\n.logo-name{\n  float: left;\n  width: 50%;\n  overflow: hidden;\n}\n\n.remove {\n  float: left;\n  border-radius: 50%;\n}\n \n  "]
                },] },
    ];
    /** @nocollapse */
    NgxUploaderComponent.ctorParameters = function () { return [
        { type: UploaderService, },
    ]; };
    NgxUploaderComponent.propDecorators = {
        "fileInput": [{ type: ViewChild, args: ['fileInput',] },],
        "textUpload": [{ type: Input },],
        "recommend": [{ type: Input },],
        "textDrop": [{ type: Input },],
        "token": [{ type: Input },],
        "urlBackend": [{ type: Input },],
        "appends": [{ type: Input },],
    };
    return NgxUploaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxUploderModule = (function () {
    function NgxUploderModule() {
    }
    /**
     * @return {?}
     */
    NgxUploderModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxUploderModule,
            providers: [UploaderService]
        };
    };
    NgxUploderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxUploaderComponent
                    ],
                    exports: [
                        NgxUploaderComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxUploderModule.ctorParameters = function () { return []; };
    return NgxUploderModule;
}());

export { NgxUploderModule, NgxUploaderComponent, UploaderService };
