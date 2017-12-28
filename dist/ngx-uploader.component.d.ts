import { OnDestroy } from '@angular/core';
import { UploaderService } from './uploader.service';
import { iAppend } from './iAppend';
export declare class NgxUploaderComponent implements OnDestroy {
    private uploaderService;
    file: any;
    canSave: boolean;
    imageUpload: string;
    percentComplete: number;
    percentUpload: any;
    fileInput: any;
    isDrop: boolean;
    fileName: string;
    textUpload: string;
    recommend: string;
    textDrop: string;
    token: string;
    urlBackend: string;
    appends: Array<iAppend>;
    constructor(uploaderService: UploaderService);
    ngOnDestroy(): void;
    drop(v: boolean): void;
    uploader(): void;
}
